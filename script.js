/**
 * 何姿慧的个人空间 - 交互脚本
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========== 移动端菜单 ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // ========== 平滑滚动 ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 关闭移动端菜单
                if (navMenu) navMenu.classList.remove('active');

                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== 导航激活状态 ==========
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ========== 返回顶部按钮 ==========
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== 留言板表单 ==========
    const messageForm = document.getElementById('messageForm');

    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(messageForm);
            const name = formData.get('name');
            const message = formData.get('message');

            // 创建新留言
            const messagesContainer = document.getElementById('messagesContainer');
            const newMessage = document.createElement('div');
            newMessage.className = 'message-card';
            newMessage.style.opacity = '0';
            newMessage.innerHTML = `
                <div class="message-header">
                    <span class="message-author">${name}</span>
                    <span class="message-time">刚刚</span>
                </div>
                <p class="message-text">${message}</p>
            `;

            messagesContainer.insertBefore(newMessage, messagesContainer.firstChild);

            // 动画显示
            setTimeout(() => {
                newMessage.style.transition = 'opacity 0.5s ease';
                newMessage.style.opacity = '1';
            }, 100);

            // 更新计数
            const messageCount = document.getElementById('messageCount');
            if (messageCount) {
                const count = parseInt(messageCount.textContent);
                messageCount.textContent = count + 1;
            }

            // 显示成功提示
            showNotification('留言成功！感谢你的足迹 ✨');

            // 清空表单
            messageForm.reset();
        });
    }

    // ========== 成功提示函数 ==========
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--primary-blue);
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // 添加通知动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========== 滚动动画 ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-card, .skill-box, .work-card, .growth-card');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // 初始化动画样式
    const elements = document.querySelectorAll('.about-card, .skill-box, .work-card, .growth-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初始执行一次
});

// ========== 思考卡片展开/收起 ==========
function toggleContent(button) {
    const card = button.closest('.growth-card');
    const fullContent = card.querySelector('.growth-full');
    const icon = button.querySelector('i');

    if (fullContent.classList.contains('hidden')) {
        fullContent.classList.remove('hidden');
        button.innerHTML = '收起 <i class="fas fa-chevron-up"></i>';
    } else {
        fullContent.classList.add('hidden');
        button.innerHTML = '展开 <i class="fas fa-chevron-down"></i>';
    }
}
