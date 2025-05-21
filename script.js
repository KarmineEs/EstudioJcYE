document.addEventListener('DOMContentLoaded', () => {
    // Cambio de Tema
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.textContent = 'Cambiar a Tema Claro';
    } else {
        themeToggle.textContent = 'Cambiar a Tema Oscuro';
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = 'Cambiar a Tema Claro';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.textContent = 'Cambiar a Tema Oscuro';
            localStorage.setItem('theme', 'light');
        }
    });

    // Menú Hamburguesa
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Animaciones al hacer scroll
    const sections = document.querySelectorAll('.animate-section');
    const elementsLeft = document.querySelectorAll('.animate-slide-left');
    const elementsRight = document.querySelectorAll('.animate-slide-right');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
    elementsLeft.forEach(element => observer.observe(element));
    elementsRight.forEach(element => observer.observe(element));

    // Navegación del Banner de Abogados
    const bannerTrack = document.getElementById('banner-track');
    if (bannerTrack) { // Verificamos que el elemento exista (no estará en las páginas de perfil o servicios)
        const slides = bannerTrack.children;
        const slideCount = slides.length;
        let currentIndex = 0;

        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');

        function updateBannerPosition() {
            bannerTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount; // Ciclo infinito
            updateBannerPosition();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount; // Ciclo infinito
            updateBannerPosition();
        });

        // Ajustar el banner al cambiar el tamaño de la ventana
        window.addEventListener('resize', updateBannerPosition);
    }
});