document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
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

    // 手机端自动隐藏视频（仅在无法自动播放时隐藏）
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    function canAutoPlayVideo() {
        // 尝试自动播放静音视频
        const video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        // 部分浏览器支持 promise
        let canPlay = false;
        try {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => { canPlay = true; }).catch(() => { canPlay = false; });
            } else {
                canPlay = true;
            }
        } catch (e) {
            canPlay = false;
        }
        return canPlay || video.autoplay;
    }
    const heroVideo = document.querySelector('.hero-video');
    if (isMobile()) {
        if (heroVideo) {
            // 如果能自动播放则显示，否则隐藏
            if (canAutoPlayVideo()) {
                heroVideo.style.display = '';
                heroVideo.muted = true;
                heroVideo.playsInline = true;
                heroVideo.autoplay = true;
                heroVideo.play();
            } else {
                heroVideo.style.display = 'none';
            }
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
});
