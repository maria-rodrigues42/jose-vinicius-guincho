// GSAP animations setup
// Note: GSAP is loaded via CDN in index.html

// Register ScrollTrigger plugin (assumes gsap.ScrollTrigger is available)
if (window.gsap && window.gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

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
