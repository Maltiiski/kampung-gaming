const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

function setMenu(open) {
  links.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
}

toggle.addEventListener('click', () => {
  setMenu(!links.classList.contains('open'));
});

links.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    setMenu(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenu(false);
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.navbar')) {
    setMenu(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    setMenu(false);
  }
});
