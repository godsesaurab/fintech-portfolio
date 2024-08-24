document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling to sections
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Disable caching for all resources
    if ('serviceWorker' in navigator) {
        caches.keys().then(function(cacheNames) {
            cacheNames.forEach(function(cacheName) {
                caches.delete(cacheName);
            });
        });
    }

    // Highlight the current section in the navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    function changeNavHighlight() {
        let index = sections.length;

        // Check if the top of the section is within the viewport
        while (--index && window.scrollY + 10 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    window.addEventListener('scroll', changeNavHighlight);
    changeNavHighlight(); // Initial call to set the correct section on load
});