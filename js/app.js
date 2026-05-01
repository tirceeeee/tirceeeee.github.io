document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    //Nav entrada
    gsap.from('.nav', { y: -20, opacity: 0, duration: 0.8, ease: 'power2.out' });

    //El hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('glitch-appear');
    }

    // Subtitulos del hero
    gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.9, delay: 0.6, ease: 'power2.out' });
    gsap.from('.hero-actions',  { y: 20, opacity: 0, duration: 0.7, delay: 0.85, ease: 'power2.out' });

    // ─── Featured projects: parallax bg + content reveal ─────────────────────
    document.querySelectorAll('.featured-project').forEach((item) => {
        const bg = item.querySelector('.featured-bg img');
        if (bg) {
            gsap.to(bg, {
                y: '20%', ease: 'none',
                scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
            });
        }
        const els = item.querySelectorAll('.featured-category, .featured-title, .featured-description, .featured-link');
        gsap.from(els, {
            y: 40, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 72%' }
        });
    });

});
