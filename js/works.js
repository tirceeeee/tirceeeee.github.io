
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.works-filter__btn');
  const workCards = document.querySelectorAll('.work-card');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    workCards.forEach((card, index) => {
      gsap.from(card.querySelector('.work-card__img'), {
        y: 120,
        scale: 0.86,
        rotate: index % 2 === 0 ? -3 : 3,
        opacity: 0,
        clipPath: 'inset(18% 0 18% 0)',
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          end: 'top 42%',
          scrub: 1.2
        }
      });
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');


      filterButtons.forEach(btn => btn.classList.remove('works-filter__btn--active'));
      button.classList.add('works-filter__btn--active');

      workCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });

      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    });
  });
});
