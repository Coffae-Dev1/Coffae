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

// ── MAKER CAROUSEL HIGHLIGHT ──
document.querySelectorAll('.makers-grid').forEach(grid => {
  const cards = [...grid.querySelectorAll('.maker-card')];
  if (!cards.length) return;

  function highlight() {
    const gridLeft = grid.getBoundingClientRect().left;
    const center = grid.clientWidth / 2;
    let active = cards[0], minDist = Infinity;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left - gridLeft + rect.width / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < minDist) { minDist = dist; active = card; }
    });
    cards.forEach(c => c.classList.toggle('active', c === active));
  }

  grid.addEventListener('scroll', highlight, { passive: true });
  highlight();
});

// ── STORY CLOSE BUTTON ──
const storyClose   = document.getElementById('storyClose');
const storyContent = document.getElementById('storyContent');
if (storyClose && storyContent) {
  storyClose.addEventListener('click', () => {
    storyContent.classList.toggle('hidden');
  });
}

// ── HAMBURGER MENU TOGGLE ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}
