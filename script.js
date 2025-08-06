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
            heroVideo.style.display = 'none'; // 移动端隐藏视频
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
});
