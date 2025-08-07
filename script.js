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

    // GitHub 统计加载成功/失败切换备用图
    const fb = document.getElementById('github-stats-fallback');
    const stat = document.getElementById('github-stats');
    if (stat && fb) {
        function showStat() {
            stat.style.display = 'block';
            fb.style.display = 'none';
        }
        function showFallback() {
            stat.style.display = 'none';
            fb.style.display = 'block';
        }
        stat.addEventListener('load', showStat);
        stat.addEventListener('error', showFallback);

        // 兼容图片已缓存的情况（延迟检查，避免跨域 naturalWidth 问题）
        setTimeout(function() {
            if (stat.complete && stat.naturalHeight !== 0) {
                showStat();
            } else if (stat.complete && stat.naturalHeight === 0) {
                showFallback();
            }
        }, 100);
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
});
