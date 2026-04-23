// Coffee bean custom cursor
(function() {
  const cursor = document.createElement('div');
  cursor.id = 'bean-cursor';
  cursor.innerHTML = `
    <svg viewBox="0 0 40 56" width="13" height="18" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="beanGrad" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stop-color="#6b3a1a"/>
          <stop offset="55%" stop-color="#3b200f"/>
          <stop offset="100%" stop-color="#1a0f06"/>
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="28" rx="17" ry="26" fill="url(#beanGrad)"/>
      <path d="M20 6 Q14 28 20 50 Q26 28 20 6" stroke="#140a04" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    </svg>
  `;
  document.body.appendChild(cursor);

  const trail = document.createElement('div');
  trail.id = 'bean-cursor-trail';
  document.body.appendChild(trail);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my, tx = mx, ty = my;
  let rot = 0, targetRot = 0, lastX = mx, lastY = my;
  let hovering = false;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    const dx = mx - lastX, dy = my - lastY;
    if (Math.abs(dx) + Math.abs(dy) > 2) {
      targetRot = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    }
    lastX = mx; lastY = my;
  });

  // hover detection on interactive elements
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('a, button, .hoverable, [data-hover]');
    hovering = !!t;
    cursor.classList.toggle('hover', hovering);
    trail.classList.toggle('hover', hovering);
  });

  function animate() {
    cx += (mx - cx) * 0.28;
    cy += (my - cy) * 0.28;
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    // shortest rotation
    let diff = targetRot - rot;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    rot += diff * 0.2;
    cursor.style.transform = `translate(${cx - 6.5}px, ${cy - 9}px) rotate(${rot}deg) scale(${hovering ? 1.35 : 1})`;
    trail.style.transform = `translate(${tx - 4}px, ${ty - 4}px) scale(${hovering ? 2.2 : 1})`;
    requestAnimationFrame(animate);
  }
  animate();

  // hide on touch devices
  if (matchMedia('(hover: none)').matches) {
    cursor.style.display = 'none';
    trail.style.display = 'none';
    document.documentElement.classList.add('touch');
  }
})();
