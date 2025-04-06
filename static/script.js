// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate Elements on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .analytics-card, .feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for elements
document.querySelectorAll('.service-card, .analytics-card, .feature').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            // Show success message
            alert(data.message);
            contactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        }
    });
}

// Captcha functionality
function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}

function updateCaptcha() {
    const captchaText = document.getElementById('captchaText');
    captchaText.textContent = generateCaptcha();
}

// Initialize captcha
document.addEventListener('DOMContentLoaded', () => {
    updateCaptcha();

    // Refresh captcha button
    document.getElementById('refreshCaptcha').addEventListener('click', updateCaptcha);

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const captchaInput = document.getElementById('captchaInput');
        const captchaText = document.getElementById('captchaText');
        
        if (captchaInput.value.toUpperCase() === captchaText.textContent) {
            // Captcha is correct, proceed with form submission
            // Add your form submission logic here
            alert('Message sent successfully!');
            e.target.reset();
            updateCaptcha();
        } else {
            alert('Invalid captcha code. Please try again.');
            updateCaptcha();
            captchaInput.value = '';
        }
    });
});

// Review Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;

    function updateSlider() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
                slide.classList.remove('prev');
                slide.classList.remove('next');
            } else if (index < currentSlide) {
                slide.classList.add('prev');
                slide.classList.remove('active');
                slide.classList.remove('next');
            } else {
                slide.classList.add('next');
                slide.classList.remove('active');
                slide.classList.remove('prev');
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
}); 