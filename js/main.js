// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ── STAGGER CARD ANIMATIONS ──
document.querySelectorAll('.card, .card-wide').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
});

// ── STAGGER TEAM PHOTO ANIMATIONS ──
document.querySelectorAll('.photo-wrap').forEach((wrap, i) => {
  wrap.style.transitionDelay = `${i * 0.05}s`;
});

// ── HAMBURGER MENU TOGGLE ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is tapped
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});
