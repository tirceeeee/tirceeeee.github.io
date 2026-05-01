document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Nav inicio animación
    gsap.from('.site-nav', { y: -20, opacity: 0, duration: 0.8, ease: 'power2.out' });

    // About 
    gsap.from('.about-heading', { y: 60, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
    gsap.from('.about-text__intro .hero__scroll-btn', { scale: 0, opacity: 0, duration: 0.6, delay: 0.8, ease: 'back.out(1.7)' });

    // Bio 
    document.querySelectorAll('.about-text__block').forEach((block) => {
        const els = block.querySelectorAll('h2, p, a');
        gsap.from(els, {
            y: 40, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: block, start: 'top 80%' }
        });
    });

    // Fade scroll
    gsap.from('.about-visual__placeholder', {
        opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-visual', start: 'top 80%' }
    });

    // Footer
    gsap.from('.site-footer__categories span', {
        y: 20, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.site-footer', start: 'top 90%' }
    });
    gsap.from('.site-footer__bottom', {
        opacity: 0, duration: 0.6, ease: 'power1.out',
        scrollTrigger: { trigger: '.site-footer', start: 'top 80%' }
    });
});
