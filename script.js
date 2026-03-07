document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const body = document.body;

    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeLabel) themeLabel.textContent = 'Dark Mode';
        if (themeToggle) themeToggle.setAttribute('aria-checked', 'true');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            // Update label and aria-checked state
            if (themeLabel) themeLabel.textContent = isDark ? 'Dark Mode' : 'Light Mode';
            themeToggle.setAttribute('aria-checked', isDark ? 'true' : 'false');

            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when a link is clicked
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const isDark = document.body.classList.contains('dark-mode');

        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 2rem';
            if (isDark) {
                navbar.style.boxShadow = '0 10px 30px rgba(0, 240, 255, 0.15)';
                navbar.style.borderBottom = '1px solid rgba(0, 240, 255, 0.3)';
            } else {
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.5)';
            }
        } else {
            navbar.style.padding = '1.5rem 2rem';
            if (isDark) {
                navbar.style.boxShadow = '0 4px 30px rgba(0, 240, 255, 0.1)';
                navbar.style.borderBottom = '1px solid rgba(0, 240, 255, 0.2)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.3)';
            }
        }
    });

    // Dark Mode Event listener update to trigger scroll effect instantly on toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // ... existing toggle logic handles classes
            // Force a scroll event to immediately update navbar styles 
            window.dispatchEvent(new Event('scroll'));
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .skill-progress');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class for CSS animations
                entry.target.classList.add('active');

                // Animate skill bars specifically
                if (entry.target.classList.contains('skill-progress')) {
                    const targetWidth = entry.target.getAttribute('data-width');
                    entry.target.style.width = targetWidth;
                }

                // Stop observing once animated to keep the state
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // WhatsApp Quick Booking Logic
    const wpButtons = document.querySelectorAll('.wp-btn');
    const phoneNumber = "9831344068";

    wpButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const message = btn.getAttribute('data-message');
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${9831344068}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Handle Formspree Success Message
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--neon-cyan); margin-bottom: 1.5rem; text-shadow: 0 0 20px rgba(0, 240, 255, 0.5);"></i>
                    <h3 style="font-size: 1.8rem; margin-bottom: 1rem;">Booking Confirmed!</h3>
                    <p style="margin-bottom: 2rem; color: var(--text-light);">I have received your request and will contact you shortly to schedule our discussion.</p>
                    <a href="index.html" class="btn btn-primary">Return to Homepage</a>
                </div>
            `;
        }
    }
});
