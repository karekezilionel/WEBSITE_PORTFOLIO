document.addEventListener('DOMContentLoaded', () => {
    // 1. Responsive Navbar Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); // For hamburger to X animation
        });

        // Close navbar when a link is clicked (for mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3. Form Validation
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(errorDiv => {
                errorDiv.textContent = '';
                errorDiv.style.display = 'none';
            });
            document.getElementById('form-success').textContent = '';
            document.getElementById('form-success').style.display = 'none';

            // Validate Name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                document.getElementById('name-error').textContent = 'Name is required.';
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }

            // Validate Email
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                document.getElementById('email-error').textContent = 'Email is required.';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }

            // Validate Message
            const messageTextarea = document.getElementById('message');
            if (messageTextarea.value.trim() === '') {
                document.getElementById('message-error').textContent = 'Message is required.';
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            } else if (messageTextarea.value.trim().length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters long.';
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                // If validation passes, simulate form submission
                // In a real application, you would send this data to a server (e.g., using fetch API)
                console.log('Form data:', {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageTextarea.value.trim()
                });
                document.getElementById('form-success').textContent = 'Message sent successfully! I will get back to you soon.';
                document.getElementById('form-success').style.display = 'block';
                contactForm.reset(); // Clear the form
            }
        });
    }


    // 4. Scroll-triggered Animations for sections
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Apply fade-in-up to sections
    document.querySelectorAll('.section-padding').forEach(section => {
        section.classList.add('fade-in-up'); // Add initial class for transition
        sectionObserver.observe(section);
    });

    // Animate skills icons individually
    const skillIcons = document.querySelectorAll('.skill-item i');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate each icon with a staggered delay
                Array.from(entry.target.children).forEach((icon, index) => {
                    if (icon.tagName === 'I') { // Ensure it's the icon
                         icon.style.animationDelay = `${index * 0.1}s`; // Stagger delay
                         icon.style.opacity = '1'; // Make it visible
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the skills grid is visible

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }


    // 5. Hero background parallax (subtle)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${-scrollPosition * 0.2}px`; // Adjust 0.2 for effect strength
        });
    }

    // 6. Typing animation for tagline (already in CSS, ensure it plays)
    // The animation starts with the element's initial state.
    // No specific JS needed here unless you want to re-trigger it.

});
