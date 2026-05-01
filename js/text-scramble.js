document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const titleSelector = '.hero-title';

  const randomFrom = (value) => value[Math.floor(Math.random() * value.length)];
  const randomChar = (char) => {
    if (char >= 'A' && char <= 'Z') return randomFrom(upperChars);
    if (char >= 'a' && char <= 'z') return randomFrom(lowerChars);
    if (char >= '0' && char <= '9') return randomFrom(numberChars);
    return char;
  };

  const stopScramble = (el) => {
    if (el.dataset.scrambleTimer) {
      window.clearTimeout(Number(el.dataset.scrambleTimer));
      delete el.dataset.scrambleTimer;
    }

    const original = el.dataset.originalText || el.textContent;
    const originalHtml = el.dataset.originalHtml || el.innerHTML;
    const quickFrames = 2;
    let frame = 0;

    const finish = () => {
      el.textContent = original
        .split('')
        .map((char) => {
          if (char === ' ' || char === '\n') return char;
          return randomChar(char);
        })
        .join('');

      frame += 1;

      if (frame <= quickFrames) {
        el.dataset.scrambleTimer = window.setTimeout(finish, 40);
      } else {
        el.innerHTML = originalHtml;
        delete el.dataset.scrambleTimer;
        el.dataset.scrambling = 'false';
        el.classList.remove('is-scrambling');
      }
    };

    finish();
  };

  const scrambleText = (el) => {
    if (el.dataset.scrambling === 'true') return;

    const original = el.dataset.originalText || el.textContent;
    const originalHtml = el.dataset.originalHtml || el.innerHTML;
    el.dataset.originalText = original;
    el.dataset.originalHtml = originalHtml;
    el.dataset.scrambling = 'true';
    el.classList.add('is-scrambling');

    let frame = 0;
    const totalFrames = 5;

    const tick = () => {
      el.textContent = original
        .split('')
        .map((char) => {
          if (char === ' ' || char === '\n') return char;
          return randomChar(char);
        })
        .join('');

      frame += 1;

      if (frame <= totalFrames) {
        el.dataset.scrambleTimer = window.setTimeout(tick, 55);
      } else {
        el.innerHTML = originalHtml;
        el.dataset.scrambling = 'false';
        el.classList.remove('is-scrambling');
        delete el.dataset.scrambleTimer;
      }
    };

    tick();
  };

  document.querySelectorAll(titleSelector).forEach((title) => {
    title.dataset.originalText = title.textContent;
    title.dataset.originalHtml = title.innerHTML;
    title.addEventListener('mouseenter', () => scrambleText(title));
    title.addEventListener('mouseleave', () => stopScramble(title));
    title.addEventListener('focus', () => scrambleText(title));
    title.addEventListener('blur', () => stopScramble(title));
  });
});
