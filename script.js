document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
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

    // --- Scroll-triggered Animations ---
    const sections = document.querySelectorAll('section');
    const skillItems = document.querySelectorAll('.skill-item i, .skill-item img'); // Include img for C++ logo

    const animateOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (sectionTop < screenHeight * 0.75) {
                section.classList.add('animate');
            } else {
                section.classList.remove('animate'); // Optional: remove animation class if scrolled out of view
            }
        });

        // Specific animation for skill icons
        skillItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight * 0.8) {
                // Apply a delayed animation for a staggered effect
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.animation = `bounceIn 0.8s ease-out forwards`;
                }, index * 100); // Stagger by 100ms per item
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load to animate elements already in view

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // IMPORTANT: Prevent default browser validation

        let isValid = true;

        // Clear previous error messages and success message
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        document.getElementById('form-success').textContent = '';
        document.getElementById('form-success').style.display = 'none';

        // Validate Name
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Please tell me your name.';
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }

        // Validate Email
        const emailInput = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            document.getElementById('email-error').textContent = 'Please provide your email address.';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }

        // Validate Message
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            // Custom error message for the message field
            document.getElementById('message-error').textContent = 'send a message to Lionel.';
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // If the form is valid, you would typically send the data to a server here.
            // For this example, we'll just show a success message and clear the form.
            document.getElementById('form-success').textContent = 'Your message has been sent successfully to lionel! I will get back to you soon.';
            document.getElementById('form-success').style.display = 'block';
            contactForm.reset(); // Clear the form fields
        }
    });
});
