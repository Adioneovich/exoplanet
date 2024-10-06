document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseCoordinates = { x: 0, y: 0 };

    const config = {
        particleCount: 40,
        particleRadius: 2,
        particleSpeed: 1,
        lineDistance: 10,
        cursorRadius: 100,
        repulsionStrength: 0.5
    };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * config.particleRadius + 1,
                color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
                vx: (Math.random() - 0.5) * config.particleSpeed,
                vy: (Math.random() - 0.5) * config.particleSpeed
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();

            // Обновление позиции частицы
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Отталкивание от курсора
            const dx = mouseCoordinates.x - particle.x;
            const dy = mouseCoordinates.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.cursorRadius) {
                const force = (config.cursorRadius - distance) / config.cursorRadius;
                particle.vx -= force * dx / distance * config.repulsionStrength;
                particle.vy -= force * dy / distance * config.repulsionStrength;
            }

            // Отскок от границ экрана
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            // Замедление частиц
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });

        // Рисование линий между частицами
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.lineDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 255, 218, ${1 - distance / config.lineDistance})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }

    function handleMouseMove(event) {
        mouseCoordinates = {
            x: event.clientX,
            y: event.clientY
        };
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    createParticles();
    drawParticles();

    // Навигация и мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 15, 30, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(15, 15, 30, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Обработка отправки формы заказа
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const siteType = document.getElementById('type-order').value;
        const tariff = document.getElementById('tariff').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const description = document.getElementById('description').value;

        const message = `Новый заказ:%0A%0AТип сайта: ${siteType}%0AТариф: ${tariff}%0AИмя: ${name}%0AТелефон: ${phone}%0AОписание: ${description}`;
        const whatsappLink = `https://wa.me/77753890205?text=${message}`;
        
        window.open(whatsappLink, '_blank');
        orderForm.reset();
    });

    // Обработка отправки контактной формы
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Здесь можно добавить логику отправки формы
        alert('Форма отправлена!');
        contactForm.reset();
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // ... (оставьте весь предыдущий код без изменений)

    // Обработка отправки формы теста космонавта
    const cosmonautTestForm = document.getElementById('cosmonaut-test-form');
    cosmonautTestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(cosmonautTestForm);
        let score = 0;
        let maxScore = 5;

        // Проверка ответов
        if (formData.get('question1') === 'mars') score++;
        if (formData.get('question2') === '8') score++;
        if (formData.get('question3').toLowerCase() === 'юпитер') score++;
        
        const satellites = formData.getAll('satellites');
        if (satellites.includes('iss') && satellites.includes('hubble') && satellites.includes('gps') && !satellites.includes('moon')) score++;

        if (formData.get('motivation').length > 50) score++;

        const percentage = (score / maxScore) * 100;
        let message = `Ваш результат: ${score} из ${maxScore} (${percentage}%)\n\n`;

        if (percentage >= 80) {
            message += "Отлично! Вы обладаете глубокими знаниями о космосе. Возможно, вы готовы стать космонавтом!";
        } else if (percentage >= 60) {
            message += "Хороший результат! У вас есть базовые знания о космосе, но есть куда расти.";
        } else {
            message += "Вам стоит больше узнать о космосе. Продолжайте изучать астрономию!";
        }

        alert(message);
        cosmonautTestForm.reset();
    });
});