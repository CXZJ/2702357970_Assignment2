document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Smooth scroll for navigation links
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

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.parentElement.dataset.progress || '0%';
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        // Reset width to 0 initially
        bar.style.width = '0';
        observer.observe(bar);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Dynamic star rating system
    const stars = document.querySelectorAll('.stars i');
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            // Reset all stars
            stars.forEach(s => s.className = 'far fa-star');
            // Fill stars up to current
            for (let i = 0; i <= index; i++) {
                stars[i].className = 'fas fa-star';
            }
        });

        star.addEventListener('mouseout', () => {
            // Reset to original state
            stars.forEach((s, i) => {
                const percentage = s.parentElement.parentElement.querySelector('span').textContent;
                const rating = parseInt(percentage) / 20; // Convert percentage to star rating (20% per star)
                s.className = i < rating ? 'fas fa-star' : 'far fa-star';
            });
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-card, .project-card, .team-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('animate');
            }
        });
    };

    // Initial check for elements in view
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
});
