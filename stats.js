import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase 配置
const SUPABASE_URL = 'https://tjchhpzqvdownojrftzw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqY2hocHpxdmRvd25vanJmdHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODI2NTYsImV4cCI6MjA2OTk1ODY1Nn0.b8NUH-MJlkLsmHMjhcDNrGIbCizZ4pnbQFPWL1fuw7Y'; // 请替换为你的实际 key
const TABLE = 'page_stats';
const ROW_ID = 1; // 只用一行统计

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchStats() {
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('id', ROW_ID)
        .single();
    if (error) {
        console.error('fetchStats error:', error);
        // 可选：页面显示错误提示
        return;
    }
    if (data) {
        if (document.getElementById('like-num')) document.getElementById('like-num').textContent = data.like;
        if (document.getElementById('coin-num')) document.getElementById('coin-num').textContent = data.coin;
        if (document.getElementById('fav-num')) document.getElementById('fav-num').textContent = data.fav;
        if (document.getElementById('share-num')) document.getElementById('share-num').textContent = data.share;
        if (document.getElementById('visit-count')) document.getElementById('visit-count').textContent = data.visit;
    }
}

async function updateStat(field) {
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('id', ROW_ID)
        .single();
    if (error) {
        console.error('updateStat select error:', error);
        return;
    }
    if (data) {
        const newValue = data[field] + 1;
        const { error: updateError } = await supabase
            .from(TABLE)
            .update({ [field]: newValue })
            .eq('id', ROW_ID);
        if (updateError) {
            console.error('updateStat update error:', updateError);
            return;
        }
        fetchStats();
    }
}

async function incrementVisit() {
    await updateStat('visit');
}

document.addEventListener('DOMContentLoaded', () => {
    fetchStats();
    incrementVisit();
    // 事件绑定前先判断元素是否存在
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn) likeBtn.onclick = () => updateStat('like');
    const coinBtn = document.getElementById('coin-btn');
    if (coinBtn) coinBtn.onclick = () => updateStat('coin');
    const favBtn = document.getElementById('fav-btn');
    if (favBtn) favBtn.onclick = () => updateStat('fav');
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) shareBtn.onclick = () => updateStat('share');
});
