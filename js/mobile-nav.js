document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const btn = document.createElement('button');
  btn.className = 'nav-hamburger';
  btn.setAttribute('aria-label', 'Abrir menú');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);

  const navLinks = nav.querySelector('.nav-links');
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = '<button class="mobile-menu__close" aria-label="Cerrar menú"><span></span><span></span></button><nav class="mobile-menu__nav"></nav>';

  if (navLinks) {
    overlay.querySelector('.mobile-menu__nav').appendChild(navLinks.cloneNode(true));
  }
  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('.mobile-menu__close');

  function openMenu() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  }

  overlay.querySelectorAll('.mobile-menu__nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  btn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
});
