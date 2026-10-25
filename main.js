/* ═══════════════════════════════════════════════
   MALHAR KULKARNI — PORTFOLIO JS
   All interactions, animations & effects
═══════════════════════════════════════════════ */

/* ─── 1. CUSTOM CURSOR ─────────────────────────── */
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Ring lags behind for smooth trail effect
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Grow ring on hoverable elements
document.querySelectorAll('a, button, .skill-card, .project-card, .profile-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});


/* ─── 2. NAV SCROLL EFFECT ─────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});


/* ─── 3. HAMBURGER / MOBILE MENU ───────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}


/* ─── 4. MATRIX CANVAS BACKGROUND ─────────────── */
(function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'PYTHONFASTAPIKAFIKUBERNETES01DOCKERSQLRESTAPI<>{}[]()=>:/\\|@#$%'.split('');
  const fontSize = 13;
  let cols = Math.floor(canvas.width / fontSize);
  let drops = Array(cols).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(5,8,16,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00c8ff';
    ctx.font = fontSize + 'px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  window.addEventListener('resize', () => {
    cols  = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(1);
  });

  setInterval(drawMatrix, 45);
})();


/* ─── 5. TYPEWRITER EFFECT ──────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  const lines = [
    'Python Backend Engineer',
    'Kafka & Microservices Dev',
    'Kubernetes Wrangler',
    'FastAPI Architect',
    'Distributed Systems Builder',
    'AWS Cloud Practitioner',
  ];
  let lineIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = lines[lineIdx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        lineIdx  = (lineIdx + 1) % lines.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, 40);
    } else {
      el.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 80);
    }
  }
  type();
})();


/* ─── 6. ANIMATED CODE BLOCK ────────────────────── */
(function initCodeBlock() {
  const el = document.getElementById('codeBlock');

  const raw = [
    { t: 'c', v: 'from ' },
    { t: 'k', v: 'fastapi ' },
    { t: 'c', v: 'import ' },
    { t: 'k', v: 'FastAPI, Depends\n' },
    { t: 'c', v: 'from ' },
    { t: 'k', v: 'kafka ' },
    { t: 'c', v: 'import ' },
    { t: 'k', v: 'KafkaProducer\n' },
    { t: 'c', v: 'import ' },
    { t: 'k', v: 'kubernetes\n\n' },
    { t: 's', v: '# 🚀 Core Banking Microservice\n' },
    { t: 'k', v: 'app ' },
    { t: 'c', v: '= ' },
    { t: 'f', v: 'FastAPI' },
    { t: 'c', v: '(title=' },
    { t: 's', v: '"BankingMS"' },
    { t: 'c', v: ')\n\n' },
    { t: 'd', v: '@app.post' },
    { t: 'c', v: '(' },
    { t: 's', v: '"/transaction"' },
    { t: 'c', v: ')\n' },
    { t: 'k', v: 'async ' },
    { t: 'c', v: 'def ' },
    { t: 'f', v: 'process_txn' },
    { t: 'c', v: '(\n' },
    { t: 'c', v: '    payload: ' },
    { t: 'f', v: 'TransactionPayload\n' },
    { t: 'c', v: ') -> ' },
    { t: 'k', v: 'dict' },
    { t: 'c', v: ':\n' },
    { t: 's', v: '    """ Validate → Kafka → K8s """' },
    { t: 'c', v: '\n' },
    { t: 'c', v: '    producer.' },
    { t: 'f', v: 'send' },
    { t: 'c', v: '(\n' },
    { t: 's', v: '        "txn-events"' },
    { t: 'c', v: ', payload.' },
    { t: 'f', v: 'json' },
    { t: 'c', v: '()\n' },
    { t: 'c', v: '    )\n' },
    { t: 'k', v: '    return ' },
    { t: 'c', v: '{' },
    { t: 's', v: '"status"' },
    { t: 'c', v: ': ' },
    { t: 's', v: '"queued"' },
    { t: 'c', v: '}\n' },
  ];

  // Color map
  const colorMap = {
    c: '#e8eef8',   // default code
    k: '#7b5fff',   // keyword / import
    s: '#00ff9d',   // string
    f: '#00c8ff',   // function
    d: '#ffbd2e',   // decorator
  };

  let allSpans = [];
  raw.forEach(token => {
    token.v.split('').forEach(ch => {
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.color   = colorMap[token.t];
      span.style.opacity = '0';
      el.appendChild(span);
      allSpans.push(span);
    });
  });

  let i = 0;
  function revealNext() {
    if (i < allSpans.length) {
      allSpans[i].style.opacity    = '1';
      allSpans[i].style.transition = 'opacity 0.05s';
      i++;
      setTimeout(revealNext, 28);
    } else {
      // Loop: reset after 4s pause
      setTimeout(() => {
        allSpans.forEach(s => s.style.opacity = '0');
        i = 0;
        setTimeout(revealNext, 400);
      }, 4000);
    }
  }
  revealNext();
})();


/* ─── 7. ANIMATED STAT COUNTERS ─────────────────── */
function animateCounter(el, target) {
  let current  = 0;
  const step   = target / 40;
  const isFloat = target % 1 !== 0;
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
  }, 35);
}

const statNums = document.querySelectorAll('.stat-num');
let statsDone  = false;

function triggerCounters() {
  if (statsDone) return;
  const hero = document.querySelector('.hero-stats');
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    statsDone = true;
    statNums.forEach(el => {
      animateCounter(el, parseFloat(el.dataset.target));
    });
  }
}
window.addEventListener('scroll', triggerCounters);
setTimeout(triggerCounters, 800); // Also try on load


/* ─── 8. SCROLL REVEAL ──────────────────────────── */
(function initReveal() {
  // Tag all section children for reveal
  const targets = document.querySelectorAll(
    '.about-grid, .about-text, .about-card, ' +
    '.skill-card, .timeline-item, .cert-card, ' +
    '.project-card, .profile-card, .contact-left, ' +
    '.contact-right, .section-eyebrow, .section-title, .certs-section'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 0.07 + 's';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
})();


/* ─── 9. SKILL BARS ANIMATION ───────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const w   = bar.dataset.w;
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
})();


/* ─── 10. ACTIVE NAV HIGHLIGHT ──────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--accent)' : '';
    });
  });
})();


/* ─── 11. PROJECT CARD MOUSE GLOW ───────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.project-glow');
    if (glow) {
      glow.style.left = x - 125 + 'px';
      glow.style.top  = y - 125 + 'px';
    }
  });
});


/* ─── 12. PROFILE CARD TILT ─────────────────────── */
document.querySelectorAll('.profile-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;
    const rotateX = -(e.clientY - centerY) / rect.height * 8;
    const rotateY =  (e.clientX - centerX) / rect.width  * 8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ─── 13. SKILL CARD TILT ───────────────────────── */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const rotateY =  (e.clientX - centerX) / rect.width  * 5;
    card.style.transform = `perspective(800px) rotateY(${rotateY}deg) translateX(4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ─── 14. FLOATING PARTICLES (hero overlay) ─────── */
(function initParticles() {
  const hero  = document.querySelector('.hero');
  if (!hero) return;

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      border-radius: 50%;
      background: rgba(0,200,255,${Math.random() * 0.4 + 0.1});
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      pointer-events: none;
      z-index: 0;
      animation: floatParticle ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    hero.appendChild(p);
  }

  // Inject keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
      33%       { transform: translate(${rand(-30,30)}px, ${rand(-40,40)}px) scale(1.3); opacity: 0.8; }
      66%       { transform: translate(${rand(-20,20)}px, ${rand(-30,30)}px) scale(0.8); opacity: 0.3; }
    }
  `;
  document.head.appendChild(style);

  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
})();








































/* ─────────────────────────────────────────────────────────
   REPLACE your existing submitForm() in portfolio/js/main.js
   with this function.

   Set API_BASE to your Railway URL after deployment.
   For local dev: http://localhost:8000
   For production: https://your-app.up.railway.app
───────────────────────────────────────────────────────── */

const API_BASE = "https://portfolio-backend-production-f4d5.up.railway.app"; // ← change this

async function submitForm() {
  const nameEl  = document.getElementById("cName");
  const emailEl = document.getElementById("cEmail");
  const msgEl   = document.getElementById("cMsg");
  const formMsg = document.getElementById("formMsg");
  const btn     = document.querySelector(".btn-primary.full-width");

  const name    = nameEl.value.trim();
  const email   = emailEl.value.trim();
  const message = msgEl.value.trim();

  // ── Client-side validation ──────────────────────────
  clearFormError(formMsg);

  if (!name || !email || !message) {
    showFormError(formMsg, "⚠️  Please fill in all fields.");
    return;
  }
  if (name.length < 2) {
    showFormError(formMsg, "⚠️  Name must be at least 2 characters.");
    return;
  }
  if (!isValidEmail(email)) {
    showFormError(formMsg, "⚠️  Please enter a valid email address.");
    return;
  }
  if (message.length < 10) {
    showFormError(formMsg, "⚠️  Message must be at least 10 characters.");
    return;
  }

  // ── Loading state ───────────────────────────────────
  btn.disabled   = true;
  btn.innerHTML  = `<span class="spinner"></span> Sending…`;

  try {
    const response = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    // ── Handle response ─────────────────────────────
    if (response.ok && data.success) {
      // Success
      showFormSuccess(formMsg, `✅  Got it, ${name}! I'll reply to you soon.`);
      btn.innerHTML  = "Message Sent ✓";
      btn.style.background = "var(--accent3)";
      btn.style.color      = "var(--bg)";
      nameEl.value  = "";
      emailEl.value = "";
      msgEl.value   = "";

      // Reset button after 5s
      setTimeout(resetBtn, 5000);

    } else if (response.status === 429) {
      // Rate limited
      showFormError(formMsg, "⚠️  Too many requests. Please wait a minute and try again.");
      resetBtn();

    } else if (response.status === 422) {
      // Validation error from FastAPI
      const detail = data.detail?.[0]?.msg || "Invalid input. Please check your details.";
      showFormError(formMsg, `⚠️  ${detail}`);
      resetBtn();

    } else {
      // Server error
      showFormError(formMsg, "❌  Something went wrong. Please email me directly.");
      resetBtn();
    }

  } catch (err) {
    // Network error
    console.error("Contact form error:", err);
    showFormError(formMsg, "❌  Network error. Please check your connection or email me directly.");
    resetBtn();
  }

  function resetBtn() {
    btn.disabled     = false;
    btn.style.background = "";
    btn.style.color      = "";
    btn.innerHTML = `Send Message
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>`;
  }
}

// ── Helpers ─────────────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormError(el, msg) {
  el.textContent = msg;
  el.style.cssText = `
    display: block;
    background: rgba(255,80,80,0.08);
    border: 1px solid rgba(255,80,80,0.3);
    color: #ff6b6b;
    padding: 0.9rem 1.2rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-size: 0.88rem;
  `;
}

function showFormSuccess(el, msg) {
  el.textContent = msg;
  el.style.cssText = `
    display: block;
    background: rgba(0,255,157,0.08);
    border: 1px solid rgba(0,255,157,0.3);
    color: var(--accent3);
    padding: 0.9rem 1.2rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-size: 0.88rem;
  `;
}

function clearFormError(el) {
  el.style.display = "none";
  el.textContent   = "";
}












// /* ─── 15. CONTACT FORM (fake submit) ────────────── */
// function submitForm() {
//   const name  = document.getElementById('cName').value.trim();
//   const email = document.getElementById('cEmail').value.trim();
//   const msg   = document.getElementById('cMsg').value.trim();
//   const msgEl = document.getElementById('formMsg');

//   if (!name || !email || !msg) {
//     msgEl.textContent = '⚠️  Please fill in all fields.';
//     msgEl.className   = 'form-message';
//     msgEl.style.cssText = 'display:block; background:rgba(255,80,80,0.08); border:1px solid rgba(255,80,80,0.3); color:#ff6b6b; padding:0.9rem 1.2rem; border-radius:8px; margin-bottom:1.5rem; font-size:0.88rem;';
//     return;
//   }

//   const btn = document.querySelector('.btn-primary.full-width');
//   btn.textContent = 'Sending…';
//   btn.disabled    = true;

//   setTimeout(() => {
//     msgEl.textContent = `✅  Got it, ${name}! I'll reply to ${email} soon.`;
//     msgEl.className   = 'form-message success';
//     msgEl.style.cssText = 'display:block;';
//     btn.innerHTML   = 'Message Sent ✓';
//     btn.style.background = 'var(--accent3)';
//     btn.style.color      = 'var(--bg)';
//     document.getElementById('cName').value  = '';
//     document.getElementById('cEmail').value = '';
//     document.getElementById('cMsg').value   = '';
//     setTimeout(() => {
//       btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
//       btn.disabled  = false;
//       btn.style.background = '';
//       btn.style.color      = '';
//     }, 4000);
//   }, 1200);
// }


/* ─── 16. GLITCH HOVER ON HERO NAME ────────────── */
document.querySelectorAll('.name-line').forEach(el => {
  const original = el.dataset.text;

  el.addEventListener('mouseenter', () => {
    let count = 0;
    const glitch = setInterval(() => {
      if (count > 8) { el.textContent = original; clearInterval(glitch); return; }
      el.textContent = original
        .split('')
        .map((ch, i) => (Math.random() > 0.7 ? randomGlyphChar() : ch))
        .join('');
      count++;
    }, 50);
  });
});

function randomGlyphChar() {
  const pool = 'ΑΒΓΔΘΛΞΨΩαβγδ01ψλξ@#%&<>';
  return pool[Math.floor(Math.random() * pool.length)];
}


/* ─── 17. SMOOTH SCROLL FOR NAV LINKS ──────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ─── 18. EASTER EGG — KONAMI CODE ─────────────── */
(function initKonami() {
  const code  = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.key === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        showEasterEgg();
      }
    } else {
      pos = 0;
    }
  });

  function showEasterEgg() {
    const toast = document.createElement('div');
    toast.innerHTML = '🐍 &nbsp;<strong>Python mode activated!</strong>&nbsp; You found the secret!';
    toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
      background: var(--surface); border: 1px solid var(--accent);
      color: var(--text); padding: 1rem 2rem; border-radius: 12px;
      font-family: var(--font-mono); font-size: 0.85rem;
      box-shadow: 0 0 40px rgba(0,200,255,0.4);
      z-index: 9999; animation: slideUp 0.4s cubic-bezier(0.4,0,0.2,1);
    `;
    document.body.appendChild(toast);
    const s = document.createElement('style');
    s.textContent = '@keyframes slideUp{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}';
    document.head.appendChild(s);
    setTimeout(() => toast.remove(), 3500);
  }
})();


/* ─── 19. SECTION ENTRANCE LINE DRAW ───────────── */
(function initEyebrowAnimation() {
  const eyebrows = document.querySelectorAll('.section-eyebrow');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeSlideRight 0.6s ease forwards';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  eyebrows.forEach(el => {
    el.style.opacity = '0';
    obs.observe(el);
  });
  const s = document.createElement('style');
  s.textContent = '@keyframes fadeSlideRight{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}';
  document.head.appendChild(s);
})();


/* ─── 20. PAGE LOAD ENTRANCE ────────────────────── */
(function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
  // Fallback
  setTimeout(() => { document.body.style.opacity = '1'; }, 800);
})();


/* ─── INIT LOG ──────────────────────────────────── */
console.log('%c🐍 Malhar Kulkarni Portfolio', 'color:#00c8ff;font-family:monospace;font-size:18px;font-weight:bold;');
console.log('%cPython Backend Engineer | TCS | FastAPI · Kafka · Kubernetes', 'color:#7b5fff;font-family:monospace;font-size:12px;');
console.log('%c📧 malharkulkarni619@gmail.com', 'color:#00ff9d;font-family:monospace;font-size:12px;');
console.log('%c💡 Try the Konami Code: ↑↑↓↓←→←→BA', 'color:#ffbd2e;font-family:monospace;font-size:11px;');


/* ═══════════════════════════════════════════════════════
   PYKE MASCOT — Avatar-based interactive mascot
   Uses pyke.avatar.json + inline SVG renderer
   (No npm needed — pure canvas/SVG fallback built-in)
═══════════════════════════════════════════════════════ */

(function initPyke() {

  /* ── Config ─────────────────────────────────────── */
  const AVATAR_JSON = 'pyke.avatar.json';
  const container   = document.getElementById('pyke-container');
  const avatarEl    = document.getElementById('pyke-avatar');
  const bubbleEl    = document.getElementById('pyke-bubble');

  if (!container || !avatarEl) return;

  /* ── Messages Pyke says ─────────────────────────── */
  const messages = {
    idle: [
      "👋 Hey! I'm Pyke.",
      "🐍 Python is life.",
      "☸️ K8s won't crash today.",
      "📨 Kafka never sleeps.",
      "💡 Got a project? Let's talk.",
      "🔥 FastAPI > everything.",
    ],
    hero: [
      "🚀 Welcome to my world.",
      "💻 1.5 yrs of backend battle-scars.",
      "⚡ FastAPI + Kafka + K8s — daily.",
    ],
    skills: [
      "🧠 These are my weapons.",
      "🐍 Python is home.",
      "☁️ AWS certified — for real.",
    ],
    experience: [
      "🏢 Currently @ Neilsoft, Pune.",
      "🏦 Built core banking systems at TCS.",
      "📊 SBI YONO 2.0 — yes, that one.",
    ],
    projects: [
      "🛠️ These kept me up at night.",
      "🍽️ QRDine — my SaaS baby.",
      "⛓️ Blockchain was a phase. Fun though.",
    ],
    contact: [
      "📬 Go on — send a message.",
      "😊 I reply fast. Usually.",
      "💼 Open to the right opportunity.",
    ],
    thinking: [
      "🤔 Hmm... processing...",
      "⏳ Give me a sec...",
    ],
    excited: [
      "🎉 Message sent!",
      "✅ Malhar got it!",
    ],
  };

  /* ── Bubble helpers ─────────────────────────────── */
  let bubbleTimer = null;

  function showBubble(text, duration = 3500) {
    clearTimeout(bubbleTimer);
    bubbleEl.textContent = text;
    bubbleEl.classList.add('visible');
    bubbleTimer = setTimeout(() => bubbleEl.classList.remove('visible'), duration);
  }

  function randomMsg(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ── Inline SVG avatar renderer ─────────────────── */
  /* Draws Pyke as a styled SVG sphere with cyan eyes  */
  /* matching the portfolio palette exactly            */

  function buildAvatarSVG(opts = {}) {
    const {
      eyeScaleY = 1,
      eyeScaleX = 1,
      headTiltZ = 0,
      pupilOffX = 0,
      pupilOffY = 0,
      bodyGlow  = false,
    } = opts;

    const bodyColor  = '#0d1525';
    const eyeColor   = '#00c8ff';
    const glowColor  = bodyGlow ? 'rgba(0,200,255,0.5)' : 'rgba(0,200,255,0.2)';

    return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <defs>
    <radialGradient id="bodyGrad" cx="38%" cy="32%" r="65%">
      <stop offset="0%"   stop-color="#1a2d4a"/>
      <stop offset="100%" stop-color="${bodyColor}"/>
    </radialGradient>
    <radialGradient id="eyeGrad" cx="35%" cy="30%" r="65%">
      <stop offset="0%"   stop-color="#80eeff"/>
      <stop offset="100%" stop-color="${eyeColor}"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="eyeGlow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- body glow ring -->
  <circle cx="60" cy="62" r="46" fill="none" stroke="${glowColor}" stroke-width="1.5"/>

  <!-- body -->
  <g transform="rotate(${headTiltZ}, 60, 60)">
    <circle cx="60" cy="60" r="44" fill="url(#bodyGrad)" filter="url(#glow)"/>

    <!-- shine -->
    <ellipse cx="46" cy="42" rx="12" ry="7" fill="rgba(255,255,255,0.07)" transform="rotate(-20,46,42)"/>

    <!-- left eye -->
    <g transform="translate(${38 + pupilOffX}, ${52 + pupilOffY})">
      <ellipse rx="${10 * eyeScaleX}" ry="${14 * eyeScaleY}" fill="url(#eyeGrad)" filter="url(#eyeGlow)"/>
      <ellipse cx="-1" cy="-2" rx="${3 * eyeScaleX}" ry="${4 * eyeScaleY}" fill="rgba(255,255,255,0.7)"/>
    </g>

    <!-- right eye -->
    <g transform="translate(${82 + pupilOffX}, ${52 + pupilOffY})">
      <ellipse rx="${10 * eyeScaleX}" ry="${14 * eyeScaleY}" fill="url(#eyeGrad)" filter="url(#eyeGlow)"/>
      <ellipse cx="-1" cy="-2" rx="${3 * eyeScaleX}" ry="${4 * eyeScaleY}" fill="rgba(255,255,255,0.7)"/>
    </g>
  </g>
</svg>`;
  }

  /* ── Animation states ───────────────────────────── */
  let currentAnim  = null;
  let animFrame    = null;
  let blinkTimer   = null;
  let isBlinking   = false;

  const states = {
    idle:     { eyeScaleY: 1,    eyeScaleX: 1,    headTiltZ: 0,  bodyGlow: false },
    thinking: { eyeScaleY: 0.5,  eyeScaleX: 1.3,  headTiltZ: -8, bodyGlow: false },
    excited:  { eyeScaleY: 1.3,  eyeScaleX: 1.2,  headTiltZ: 5,  bodyGlow: true  },
    sleeping: { eyeScaleY: 0.15, eyeScaleX: 1.5,  headTiltZ: 12, bodyGlow: false },
    working:  { eyeScaleY: 0.8,  eyeScaleX: 1,    headTiltZ: -5, bodyGlow: false },
    happy:    { eyeScaleY: 1.2,  eyeScaleX: 0.9,  headTiltZ: 6,  bodyGlow: true  },
    curious:  { eyeScaleY: 1.1,  eyeScaleX: 1,    headTiltZ: -14,bodyGlow: false },
  };

  function render(opts) {
    avatarEl.innerHTML = buildAvatarSVG(opts);
  }

  function setAnimation(name) {
    currentAnim = name;
    const s = states[name] || states.idle;
    render(s);
  }

  /* ── Idle float animation ───────────────────────── */
  let floatT = 0;
  function floatLoop() {
    if (currentAnim !== 'idle') { animFrame = requestAnimationFrame(floatLoop); return; }
    floatT += 0.02;
    const tiltZ   = Math.sin(floatT) * 4;
    const pupilOY = Math.sin(floatT * 0.7) * 2;
    render({ eyeScaleY: 1, eyeScaleX: 1, headTiltZ: tiltZ, pupilOffY: pupilOY, bodyGlow: false });
    animFrame = requestAnimationFrame(floatLoop);
  }

  /* ── Blink ──────────────────────────────────────── */
  function blink() {
    if (isBlinking) return;
    isBlinking = true;
    const saved = states[currentAnim] || states.idle;
    render({ ...saved, eyeScaleY: 0.05 });
    setTimeout(() => { render(saved); isBlinking = false; }, 140);
  }

  function scheduleBlink() {
    const delay = 2500 + Math.random() * 3500;
    blinkTimer = setTimeout(() => { blink(); scheduleBlink(); }, delay);
  }

  /* ── Section awareness ──────────────────────────── */
  const sectionMap = {
    home:       { anim: 'idle',     msgs: messages.hero },
    about:      { anim: 'curious',  msgs: messages.idle },
    skills:     { anim: 'working',  msgs: messages.skills },
    experience: { anim: 'thinking', msgs: messages.experience },
    projects:   { anim: 'happy',    msgs: messages.projects },
    profiles:   { anim: 'curious',  msgs: messages.idle },
    contact:    { anim: 'excited',  msgs: messages.contact },
  };

  let lastSection = '';
  function onScroll() {
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 300) current = s.id;
    });
    if (current !== lastSection) {
      lastSection = current;
      const cfg = sectionMap[current] || sectionMap.home;
      setAnimation(cfg.anim);
      setTimeout(() => showBubble(randomMsg(cfg.msgs)), 600);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Click interaction ──────────────────────────── */
  container.addEventListener('click', () => {
    setAnimation('excited');
    showBubble(randomMsg(messages.idle), 3000);
    setTimeout(() => setAnimation('idle'), 1800);
  });

  /* ── Hover interaction ──────────────────────────── */
  container.addEventListener('mouseenter', () => {
    if (currentAnim === 'idle') setAnimation('happy');
  });
  container.addEventListener('mouseleave', () => {
    if (currentAnim === 'happy') setAnimation('idle');
  });

  /* ── Form state integration ─────────────────────── */
  // Watch for form submission — Pyke reacts
  const sendBtn = document.querySelector('.btn-primary.full-width');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      setAnimation('thinking');
      showBubble(randomMsg(messages.thinking), 4000);
      // Watch for success message
      const obs = new MutationObserver(() => {
        const msg = document.getElementById('formMsg');
        if (msg && msg.style.display !== 'none' && msg.textContent.includes('Got it')) {
          setAnimation('excited');
          showBubble(randomMsg(messages.excited), 4000);
          setTimeout(() => setAnimation('idle'), 3000);
          obs.disconnect();
        }
      });
      const formMsg = document.getElementById('formMsg');
      if (formMsg) obs.observe(formMsg, { attributes: true, childList: true });
    });
  }

  /* ── Konami Code — Pyke goes wild ───────────────── */
  document.addEventListener('pyke:konami', () => {
    setAnimation('excited');
    showBubble('🎉 You found my secret! 🐍', 4000);
    setTimeout(() => setAnimation('idle'), 3000);
  });

  /* ── Idle random messages ───────────────────────── */
  setInterval(() => {
    if (currentAnim === 'idle' && !bubbleEl.classList.contains('visible')) {
      if (Math.random() < 0.4) showBubble(randomMsg(messages.idle), 3000);
    }
  }, 8000);

  /* ── Boot ───────────────────────────────────────── */
  setAnimation('idle');
  scheduleBlink();
  floatLoop();

  // Wake up animation
  setTimeout(() => {
    setAnimation('excited');
    showBubble("👋 Hey! I'm Pyke — Malhar's dev mascot.", 4000);
    setTimeout(() => setAnimation('idle'), 2000);
  }, 1500);

})();


/* ─── UPDATE KONAMI to fire pyke:konami event ──────── */
// Patch the existing Konami handler to also notify Pyke
(function patchKonami() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.key === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        document.dispatchEvent(new CustomEvent('pyke:konami'));
      }
    } else { pos = 0; }
  });
})();
