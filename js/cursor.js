// Coffee bean custom cursor
(function() {
  const cursor = document.createElement('div');
  cursor.id = 'bean-cursor';
  cursor.innerHTML = `
    <svg viewBox="0 0 40 56" width="16" height="22" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="beanGrad" cx="32%" cy="28%" r="95%">
          <stop offset="0%" stop-color="#b89070"/>
          <stop offset="55%" stop-color="#8a6446"/>
          <stop offset="100%" stop-color="#5e4128"/>
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="28" rx="17" ry="26" fill="url(#beanGrad)" stroke="#4a3118" stroke-width="0.7" stroke-opacity="0.7"/>
      <path d="M20 7 Q14 28 20 49 Q26 28 20 7" stroke="#3d2814" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.8"/>
      <ellipse cx="14" cy="17" rx="3.5" ry="5.5" fill="#d9b48c" opacity="0.45"/>
    </svg>
  `;
  document.body.appendChild(cursor);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
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
  });

  function animate() {
    cx += (mx - cx) * 0.55;
    cy += (my - cy) * 0.55;
    // shortest rotation
    let diff = targetRot - rot;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    rot += diff * 0.35;
    cursor.style.transform = `translate(${cx - 8}px, ${cy - 11}px) rotate(${rot}deg) scale(${hovering ? 1.35 : 1})`;
    requestAnimationFrame(animate);
  }
  animate();

  // hide on touch devices
  if (matchMedia('(hover: none)').matches) {
    cursor.style.display = 'none';
    document.documentElement.classList.add('touch');
  }
})();
