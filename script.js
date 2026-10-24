const root = document.documentElement;
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* mobile menu */
function setMenu(open) {
  links.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
}

toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
links.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', (e) => { if (!e.target.closest('.navbar')) setMenu(false); });
window.addEventListener('resize', () => { if (window.innerWidth > 760) setMenu(false); });

/* scroll progress bar */
const bar = document.querySelector('.progress');
function updateProgress() {
  const max = root.scrollHeight - window.innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

/* highlight the dot for the section in view */
const dots = [...document.querySelectorAll('.dots a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = '#' + entry.target.dataset.section;
    dots.forEach((dot) => dot.classList.toggle('active', dot.getAttribute('href') === id));
  });
}, { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('[data-section]').forEach((s) => sectionObserver.observe(s));

/* logo follows the pointer slightly */
const stage = document.querySelector('.logo-stage');
if (stage && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    stage.style.setProperty('--rx', `${x * 14}deg`);
    stage.style.setProperty('--ry', `${-y * 14}deg`);
  });
  stage.addEventListener('pointerleave', () => {
    stage.style.setProperty('--rx', '0deg');
    stage.style.setProperty('--ry', '0deg');
  });
}

/* slides: loading state + fullscreen */
const deck = document.getElementById('deck');
const fsBtn = document.getElementById('fs-btn');

deck.querySelector('iframe').addEventListener('load', () => deck.classList.add('loaded'));

if (deck.requestFullscreen) {
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else deck.requestFullscreen();
  });
  document.addEventListener('fullscreenchange', () => {
    fsBtn.textContent = document.fullscreenElement === deck ? 'Keluar layar penuh' : 'Layar penuh';
  });
} else {
  fsBtn.hidden = true;
}