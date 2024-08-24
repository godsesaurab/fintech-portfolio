document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling to sections
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Disable caching for all resources
    if ('serviceWorker' in navigator) {
        caches.keys().then(function (cacheNames) {
            cacheNames.forEach(function (cacheName) {
                caches.delete(cacheName);
            });
        });
    }

    // Highlight the current section in the navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let currentActive = null;

    function changeNavHighlight() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const offset = window.scrollY + headerHeight + 20;

        let currentSection = sections[0];
        sections.forEach(section => {
            if (section.offsetTop <= offset) {
                currentSection = section;
            }
        });

        const currentLink = document.querySelector(`nav a[href="#${currentSection.id}"]`);
        if (currentLink !== currentActive) {
            if (currentActive) currentActive.classList.remove('active');
            currentLink.classList.add('active');
            currentActive = currentLink;
        }
    }

    window.addEventListener('scroll', debounce(changeNavHighlight, 50));
    window.addEventListener('resize', debounce(changeNavHighlight, 50));
    changeNavHighlight(); // Highlight the correct nav on page load

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const later = () => {
                timeout = null;
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});