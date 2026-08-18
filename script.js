// GSAP animations setup
// Note: GSAP is loaded via CDN in index.html

// Register ScrollTrigger plugin (assumes gsap.ScrollTrigger is available)
if (window.gsap && window.gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

// Hero animations (on page load)
const heroTimeline = gsap.timeline();

// Title lines reveal (staggered)
heroTimeline.from('.line-inner', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
}, 0);

// Subtitle reveal
heroTimeline.from('.hero-subtitle span', {
    opacity: 0,
    y: 10,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
}, 0.3);

// Feature items slide-in from left
heroTimeline.from('.feature-item', {
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
}, 0.6);

// CTA button fade-in with scale
heroTimeline.from('.btn-large', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out'
}, 0.9);

// Hero video/image fade-in and scale
heroTimeline.from('.hero-image', {
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    ease: 'power2.out'
}, 0.3);

// Tire mark animation (scroll-triggered, dynamic fade-out)
gsap.registerPlugin(ScrollTrigger);

const tireMarkPairs = document.querySelectorAll('.tire-mark-pair');

tireMarkPairs.forEach((pair, index) => {
    gsap.to(pair, {
        scrollTrigger: {
            trigger: '.servicos',
            start: 'top center',
            end: 'bottom center',
            scrub: 0.5,  // Smooth lag between scroll and animation
            markers: false
        },
        x: -200,  // Move left (direction of travel)
        opacity: 0,  // Fade to transparent
        duration: 1.5,
        delay: index * 0.3,  // Stagger each pair
        ease: 'power2.inOut'
    });
});

// Nav scroll animation (background blur on scroll)
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
