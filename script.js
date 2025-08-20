document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // 阻止页面滚动
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // 点击菜单项后自动收起菜单（仅移动端）
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // 手机端/桌面端自动播放视频，保证视频显示且自动播放
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        if (window.innerWidth <= 768) {
            // 移动端完全禁止视频播放和加载
            heroVideo.parentNode && heroVideo.parentNode.removeChild(heroVideo);
        } else {
            heroVideo.muted = true;
            heroVideo.playsInline = true;
            heroVideo.setAttribute('playsinline', 'true');
            heroVideo.setAttribute('webkit-playsinline', 'true');
            heroVideo.autoplay = true;
            heroVideo.loop = true;
            heroVideo.style.display = ''; // 保证所有设备都显示
            heroVideo.style.objectFit = 'cover';
            heroVideo.style.objectPosition = 'center center';
            // 兼容性处理
            heroVideo.play().catch(() => {});
        }
    }
    
    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.timeline-item, .skill-category, .award-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // GitHub 统计：若 1 秒内未加载成功则显示备用图
    const fb = document.getElementById('github-stats-fallback');
    const stat = document.getElementById('github-stats-img');
    if (stat && fb) {
        let settled = false;
        let timer;

        function cleanup() {
            stat.removeEventListener('load', onLoad);
            stat.removeEventListener('error', onError);
            if (timer) clearTimeout(timer);
        }
        function showStat() {
            if (settled) return;
            settled = true;
            stat.style.display = 'block';
            fb.style.display = 'none';
            if (fb.parentNode) fb.parentNode.removeChild(fb);
            cleanup();
        }
        function showFallback() {
            if (settled) return;
            settled = true;
            stat.style.display = 'none';
            fb.style.display = 'block';
            cleanup();
        }
        function onLoad() { showStat(); }
        function onError() { showFallback(); }

        stat.addEventListener('load', onLoad);
        stat.addEventListener('error', onError);

        if (stat.complete) {
            // 若图片已缓存，立即判断尺寸是否有效
            (stat.naturalWidth > 0) ? showStat() : showFallback();
        } else {
            // 1 秒超时未加载成功则走备用图
            timer = setTimeout(showFallback, 1000);
        }
    }

    // 移动端元素大小优化
    function optimizeMobileLayout() {
        if (window.innerWidth <= 768) {
            // research-tag 比 research-focus 小
            const researchTags = document.querySelectorAll('.research-tag');
            const researchFocus = document.querySelectorAll('.research-focus');

            researchTags.forEach(tag => {
                tag.style.fontSize = '0.85rem';
                tag.style.padding = '6px 12px';
                tag.style.margin = '4px';
            });

            researchFocus.forEach(focus => {
                focus.style.fontSize = '1rem';
                focus.style.padding = '8px 16px';
            });

            // 放大 skill-category
            const skillCategories = document.querySelectorAll('.skill-category');
            skillCategories.forEach(category => {
                category.style.transform = 'scale(1.1)';
                category.style.margin = '20px 10px';
            });

            // 缩小 stats-grid 中的 stat-card
            const statCards = document.querySelectorAll('.stats-grid .stat-card');
            statCards.forEach(card => {
                card.style.transform = 'scale(0.9)';
                card.style.margin = '10px 5px';
            });

            // 放大 lottie-footer 动图
            const lottieFooter = document.querySelector('.lottie-footer');
            if (lottieFooter) {
                lottieFooter.style.transform = 'scale(1.3)';
                lottieFooter.style.margin = '30px auto';
            }
        } else {
            // 桌面端恢复默认样式
            const researchTags = document.querySelectorAll('.research-tag');
            const researchFocus = document.querySelectorAll('.research-focus');
            const skillCategories = document.querySelectorAll('.skill-category');
            const statCards = document.querySelectorAll('.stats-grid .stat-card');
            const lottieFooter = document.querySelector('.lottie-footer');

            researchTags.forEach(tag => {
                tag.style.fontSize = '';
                tag.style.padding = '';
                tag.style.margin = '';
            });

            researchFocus.forEach(focus => {
                focus.style.fontSize = '';
                focus.style.padding = '';
            });

            skillCategories.forEach(category => {
                category.style.transform = '';
                category.style.margin = '';
            });

            statCards.forEach(card => {
                card.style.transform = '';
                card.style.margin = '';
            });

            if (lottieFooter) {
                lottieFooter.style.transform = '';
                lottieFooter.style.margin = '';
            }
        }
    }

    // 初始化移动端布局优化
    optimizeMobileLayout();

    // 监听窗口大小变化
    window.addEventListener('resize', optimizeMobileLayout);

    // 新增：微信二维码弹窗交互
    const wechatBtn = document.getElementById('wechat-btn');
    const wechatModal = document.getElementById('wechat-modal');
    const wechatOverlay = document.getElementById('wechat-modal-overlay');
    const wechatClose = document.getElementById('wechat-modal-close');

    function openWeChatModal() {
        if (!wechatModal) return;
        wechatModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        copyWeChatId();              // 新增：打开时复制微信号并提示
        wechatClose && wechatClose.focus();
    }

    function closeWeChatModal() {
        if (!wechatModal) return;
        wechatModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        wechatBtn && wechatBtn.focus();
    }

    // 新增：通用 Toast（复用原微信 Toast 容器 ID，避免新增 CSS）
    function showToast(msg) {
        let toast = document.getElementById('wechat-copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'wechat-copy-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove('show'), 2000);
    }

    // 新增：复制微信号并提示
    function copyWeChatId() {
        const wechatId = 'wxhwxh-wxh';
        const isEnglish = (document.documentElement.lang || '').toLowerCase().startsWith('en');
        const successMsg = isEnglish ? 'WeChat ID copied' : '微信号已复制';
        const failMsgPrefix = isEnglish ? 'Copy failed, please add manually: ' : '复制失败，请手动添加: ';
        function fallbackCopy(text) {
            try {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                showToast(successMsg);
            } catch {
                showToast(failMsgPrefix + text);
            }
        }
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(wechatId)
                .then(() => showToast(successMsg))
                .catch(() => fallbackCopy(wechatId));
        } else {
            fallbackCopy(wechatId);
        }
    }

    if (wechatBtn && wechatModal) {
        wechatBtn.addEventListener('click', openWeChatModal);
        wechatClose && wechatClose.addEventListener('click', closeWeChatModal);
        wechatOverlay && wechatOverlay.addEventListener('click', closeWeChatModal);

        // 按下 Esc 关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && wechatModal.getAttribute('aria-hidden') === 'false') {
                closeWeChatModal();
            }
        });
    }

    /* 新增：邮箱按钮点击复制邮箱并提示，再打开邮件客户端 */
    const emailLink = document.querySelector('.contact-link.email');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            const href = emailLink.getAttribute('href');
            const email = '2335718423@qq.com';
            const isEnglish = (document.documentElement.lang || '').toLowerCase().startsWith('en');
            const successMsg = isEnglish ? 'Email copied' : '邮箱已复制';
            const failMsg = isEnglish ? 'Copy failed, email: ' + email : '复制失败，邮箱：' + email;

            e.preventDefault(); // 先复制再跳转

            function fallbackCopy() {
                try {
                    const ta = document.createElement('textarea');
                    ta.value = email;
                    ta.style.position = 'fixed';
                    ta.style.opacity = '0';
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    showToast(successMsg);
                } catch {
                    showToast(failMsg);
                }
            }

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email)
                    .then(() => showToast(successMsg))
                    .catch(() => fallbackCopy());
            } else {
                fallbackCopy();
            }

            // 略微延迟，确保复制优先执行
            setTimeout(() => { window.location.href = href; }, 120);
        });
    }
});
