// ==================== //
// Smooth Scrolling
// ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ==================== //
// Navbar Scroll Effect
// ==================== //
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== //
// Mobile Navigation
// ==================== //
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== //
// Active Navigation Link
// ==================== //
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== //
// Intersection Observer for Animations
// ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(50px)';
    category.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(category);
});

// Observe education cards
document.querySelectorAll('.edu-card, .cert-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// ==================== //
// Contact Form Handling
// ==================== //
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link (you can replace this with actual form submission)
    const mailtoLink = `mailto:lesteripulansible@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for reaching out! Your default email client will open.');
    
    // Reset form
    contactForm.reset();
});

// ==================== //
// Typing Effect for Hero (Optional Enhancement)
// ==================== //
const heroDescription = document.querySelector('.hero-description');
if (heroDescription) {
    const text = heroDescription.textContent;
    heroDescription.textContent = '';
    heroDescription.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 30;
    
    function typeText() {
        if (charIndex < text.length) {
            heroDescription.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }
    
    // Start typing after hero animations
    setTimeout(typeText, 1200);
}

// ==================== //
// Cursor Effect (Optional Enhancement)
// ==================== //
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
        display: none;
    }
    
    @media (min-width: 1024px) {
        .custom-cursor {
            display: block;
        }
        
        body {
            cursor: none;
        }
        
        a, button {
            cursor: none;
        }
    }
    
    .custom-cursor.hover {
        width: 40px;
        height: 40px;
        background: rgba(78, 86, 192, 0.2);
        border-color: var(--secondary);
    }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor hover effect
document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(elem => {
    elem.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    elem.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ==================== //
// Parallax Effect for Hero Grid
// ==================== //
const heroGrid = document.querySelector('.hero-grid');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroGrid && scrolled < window.innerHeight) {
        heroGrid.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== //
// Dynamic Year in Footer
// ==================== //
const footerYear = document.querySelector('.footer-text p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Lester Sible. Built with passion and code.`;
}

// ==================== //
// Project Card Tilt Effect
// ==================== //
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * -5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== //
// Loading Animation
// ==================== //
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #4E56C0; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with 💜 by Lester Sible', 'color: #9B5DE0; font-size: 14px;');