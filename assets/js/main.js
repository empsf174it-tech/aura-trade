/* f:/FINANCE/DEMAT/assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. Theme Toggle Logic
    const htmlEl = document.documentElement;
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const THEME_KEY = 'auratrade-theme';

    // Initialize theme
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', initialTheme);
        updateThemeIcons(initialTheme);
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('.theme-icon');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.remove('ph-moon');
                    icon.classList.add('ph-sun');
                } else {
                    icon.classList.remove('ph-sun');
                    icon.classList.add('ph-moon');
                }
            }
        });
    }

    // 3. Mobile Drawer Logic
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const drawerClose = document.getElementById('drawerClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Close drawer when clicking a link inside it
    const drawerLinks = document.querySelectorAll('.drawer-nav .nav-link, .drawer-actions .btn');
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // 4. Scroll-Spy (Intersection Observer)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar .nav-link, .drawer-nav .nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                // Remove active class from all
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 5. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Form Validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const inquiry = document.getElementById('inquiry');
            const message = document.getElementById('message');
            const consent = document.getElementById('consent');
            const consentError = document.getElementById('consentError');

            // Reset errors
            [name, email, inquiry, message].forEach(el => {
                if (el) el.classList.remove('error');
            });
            if (consentError) consentError.style.display = 'none';

            // Validate Name
            if (!name.value.trim()) {
                name.classList.add('error');
                isValid = false;
            }

            // Validate Email (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                email.classList.add('error');
                isValid = false;
            }

            // Validate Select
            if (!inquiry.value) {
                inquiry.classList.add('error');
                isValid = false;
            }

            // Validate Message
            if (!message.value.trim()) {
                message.classList.add('error');
                isValid = false;
            }

            // Validate Checkbox
            if (!consent.checked) {
                consentError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    formSuccess.style.display = 'block';

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });

        // Inline removal of error class on input
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
        const consent = document.getElementById('consent');
        if (consent) {
            consent.addEventListener('change', () => {
                if (consent.checked) {
                    document.getElementById('consentError').style.display = 'none';
                }
            });
        }
    }
});
