// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Matrix canvas
(function() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let cols, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = new Array(cols).fill(1);
  }

  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモYABCDEF';

  function draw() {
    ctx.fillStyle = 'rgba(5, 10, 5, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = '14px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 18, drops[i] * 18);
      if (drops[i] * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 50);
})();

// Typewriter hero sequence
(function() {
  const heroInit = document.getElementById('hero-init');
  const heroName = document.getElementById('hero-name');
  const heroSub  = document.getElementById('hero-sub');
  const heroBtns = document.getElementById('hero-btns');

  const lines = [
    { text: 'Establishing secure connection...', cls: '' },
    { text: '[OK] Authentication successful.', cls: 'hero-ok' },
  ];

  function typeText(el, text, speed, callback) {
    let i = 0;
    const span = document.createElement('span');
    el.appendChild(span);
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    el.appendChild(cursor);

    const iv = setInterval(() => {
      if (i < text.length) {
        span.textContent += text[i++];
      } else {
        clearInterval(iv);
        el.removeChild(cursor);
        el.appendChild(document.createElement('br'));
        if (callback) callback();
      }
    }, speed);
  }

  let lineIdx = 0;
  function nextLine() {
    if (lineIdx >= lines.length) {
      heroName.classList.add('visible');
      setTimeout(() => {
        heroSub.classList.add('visible');
        setTimeout(() => heroBtns.classList.add('visible'), 400);
      }, 300);
      return;
    }
    const { text, cls } = lines[lineIdx++];
    const span = document.createElement('span');
    if (cls) span.className = cls;
    heroInit.appendChild(span);

    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    heroInit.appendChild(cursor);

    const iv = setInterval(() => {
      if (i < text.length) {
        span.textContent += text[i++];
      } else {
        clearInterval(iv);
        heroInit.removeChild(cursor);
        heroInit.appendChild(document.createElement('br'));
        setTimeout(nextLine, 300);
      }
    }, 28);
  }

  nextLine();
})();
