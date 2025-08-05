// 引入 Supabase SDK
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase 配置（请替换为你的项目配置）
const SUPABASE_URL = "https://tjchhpzqvdownojrftzw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqY2hocHpxdmRvd25vanJmdHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODI2NTYsImV4cCI6MjA2OTk1ODY1Nn0.b8NUH-MJlkLsmHMjhcDNrGIbCizZ4pnbQFPWL1fuw7Y";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const TABLE = "page_stats";
const ROW_ID = "main"; // 主键

const BILIBILI_BLUE = '#00A1D6';

// 判断是否已操作过
function hasActed(type) {
    return localStorage.getItem(`page_stat_${type}`) === '1';
}
function setActed(type) {
    localStorage.setItem(`page_stat_${type}`, '1');
}

// 设置按钮激活色
function setBtnActive(btnId, iconId) {
    const btn = document.getElementById(btnId);
    const icon = document.getElementById(iconId);
    if (btn) btn.classList.add('active-btn');
    if (icon) icon.style.color = BILIBILI_BLUE;
}

// 悬停/离开时切换颜色
function setupBtnHover(btnId, iconId) {
    const btn = document.getElementById(btnId);
    const icon = document.getElementById(iconId);
    if (!btn || !icon) return;
    btn.addEventListener('mouseenter', () => {
        icon.style.color = BILIBILI_BLUE;
    });
    btn.addEventListener('mouseleave', () => {
        if (!btn.classList.contains('active-btn')) {
            icon.style.color = '#666';
        }
    });
}

// 复制当前网址
function copyUrl() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => {})
        .catch(() => {});
}

async function fetchStats() {
    // 查询主行
    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("id", ROW_ID)
        .single();

    if (data) {
        if (document.getElementById('like-num')) document.getElementById('like-num').textContent = data.like ?? 0;
        if (document.getElementById('coin-num')) document.getElementById('coin-num').textContent = data.coin ?? 0;
        if (document.getElementById('fav-num')) document.getElementById('fav-num').textContent = data.fav ?? 0;
        if (document.getElementById('share-num')) document.getElementById('share-num').textContent = data.share ?? 0;
        if (document.getElementById('visit-count')) document.getElementById('visit-count').textContent = data.visit ?? 0;
    } else {
        // 初始化主行
        await supabase.from(TABLE).insert([{
            id: ROW_ID,
            like: 0,
            coin: 0,
            fav: 0,
            share: 0,
            visit: 0
        }]);
        fetchStats();
    }
}

async function updateStat(field) {
    // 原子自增
    await supabase.rpc('increment_stat', { row_id: ROW_ID, field_name: field });
    fetchStats();
}

// 需要在 Supabase SQL 中创建如下函数：
// CREATE OR REPLACE FUNCTION increment_stat(row_id text, field_name text)
// RETURNS void LANGUAGE plpgsql AS $$
// BEGIN
//   EXECUTE format('UPDATE page_stats SET %I = %I + 1 WHERE id = $1', field_name, field_name) USING row_id;
// END; $$;

async function incrementVisit() {
    await updateStat('visit');
}

document.addEventListener('DOMContentLoaded', () => {
    fetchStats();
    incrementVisit();

    // 点赞
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn) {
        setupBtnHover('like-btn', 'like-icon');
        if (hasActed('like')) setBtnActive('like-btn', 'like-icon');
        likeBtn.onclick = () => {
            if (hasActed('like')) return;
            updateStat('like');
            setActed('like');
            setBtnActive('like-btn', 'like-icon');
        };
    }

    // 投币
    const coinBtn = document.getElementById('coin-btn');
    if (coinBtn) {
        setupBtnHover('coin-btn', 'coin-icon');
        if (hasActed('coin')) setBtnActive('coin-btn', 'coin-icon');
        coinBtn.onclick = () => {
            if (hasActed('coin')) return;
            updateStat('coin');
            setActed('coin');
            setBtnActive('coin-btn', 'coin-icon');
        };
    }

    // 收藏
    const favBtn = document.getElementById('fav-btn');
    if (favBtn) {
        setupBtnHover('fav-btn', 'fav-icon');
        if (hasActed('fav')) setBtnActive('fav-btn', 'fav-icon');
        favBtn.onclick = () => {
            if (hasActed('fav')) return;
            updateStat('fav');
            setActed('fav');
            setBtnActive('fav-btn', 'fav-icon');
        };
    }

    // 转发
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        setupBtnHover('share-btn', 'share-icon');
        shareBtn.onclick = () => {
            copyUrl();
            updateStat('share');
            const icon = document.getElementById('share-icon');
            if (icon) {
                icon.style.color = BILIBILI_BLUE;
                setTimeout(() => {
                    icon.style.color = '#666';
                }, 400);
            }
        };
    }
});
