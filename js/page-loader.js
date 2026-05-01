document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const frameCount = 55;
  const frameDelay = 14;
  const framePaths = Array.from({ length: frameCount }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    return `img/roto${number}.png`;
  });

  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.setAttribute('aria-hidden', 'true');

  const frame = document.createElement('img');
  frame.className = 'page-loader__frame';
  frame.alt = '';
  frame.decoding = 'sync';
  frame.src = framePaths[0];

  loader.appendChild(frame);

  document.body.appendChild(loader);

  framePaths.forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  const isInternalPageLink = (link) => {
    if (!link || link.target || link.hasAttribute('download')) return false;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return false;

    return url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/');
  };

  const playFrames = ({ reverse = false, onComplete } = {}) => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const sequence = reverse ? [...framePaths].reverse() : framePaths;
    let index = 0;

    loader.classList.add('is-active');

    const tick = () => {
      frame.src = sequence[index];
      index += 1;

      if (index < sequence.length) {
        window.setTimeout(tick, frameDelay);
      } else {
        onComplete?.();
      }
    };

    tick();
  };

  if (sessionStorage.getItem('pageTransition') === 'active') {
    sessionStorage.removeItem('pageTransition');
    playFrames({
      onComplete: () => loader.classList.remove('is-active')
    });
  } else if (!sessionStorage.getItem('initialPageLoadPlayed')) {
    sessionStorage.setItem('initialPageLoadPlayed', 'true');
    playFrames({
      onComplete: () => loader.classList.remove('is-active')
    });
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!isInternalPageLink(link) || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const url = new URL(link.getAttribute('href'), window.location.href);
    if (url.href === window.location.href) return;

    event.preventDefault();
    sessionStorage.setItem('pageTransition', 'active');

    playFrames({
      onComplete: () => {
        window.location.href = url.href;
      }
    });
  });
});
