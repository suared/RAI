document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileMenuToggle && mainNav && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle the active class on the button, navigation, and overlay
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mainNav.contains(event.target)) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
            }
        });

        // Reset mobile menu state on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
            }
        });
    }
}); 
