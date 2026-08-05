
const greetings = [
    "Ciao, sono ",
    "Hi, I'm ",
    "Hola, soy ",
    "你好，我是 ",
    "नमस्ते, मैं",
    "Olá, eu sou ",
    "Привет, я ",
    "こんにちは、私はです",
    "Hallo, ich bin ",
    "Bonjour, je suis ",
    "안녕하세요, 저는 ",
    "Merhaba, ben "
];

const greeting = document.getElementById("ciao");

let index = 0;

function changeGreeting() {
    greeting.classList.add("fade-out");

    setTimeout(() => {
        greeting.textContent = greetings[index];
        greeting.classList.remove("fade-out");

        index = (index + 1) % greetings.length;
    }, 500);
}

changeGreeting();

setInterval(changeGreeting, 2500);
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===================================================
     BOOT SEQUENCE
     =================================================== */
  const boot = document.getElementById('boot');
  const bootConsole = document.getElementById('bootConsole');
  const bootFill = document.getElementById('bootFill');

  const bootLines = [
    '> LOADING ASSETS...',
    '> MOUNTING SPRITES...',
    '> CALIBRATING PIXELS...',
    '> PLAYER 1 READY.'
  ];

  function hideBoot() {
    if (!boot || boot.classList.contains('hide')) return;
    boot.classList.add('hide');
    setTimeout(() => boot.remove(), 600);
  }

  function runBoot() {
    if (!boot || !bootConsole) return;

    if (reduceMotion) {
      hideBoot();
      return;
    }

    bootLines.forEach((line, i) => {
      const div = document.createElement('div');
      div.textContent = line;
      div.style.animationDelay = `${i * 0.35}s`;
      bootConsole.appendChild(div);
    });

    requestAnimationFrame(() => {
      if (bootFill) bootFill.style.width = '100%';
    });

    const autoHide = setTimeout(hideBoot, 2400);
    const skip = () => { clearTimeout(autoHide); hideBoot(); };
    boot.addEventListener('click', skip, { once: true });
    window.addEventListener('keydown', skip, { once: true });
  }

  runBoot();
  /* ===================================================
     HERO ROLE TYPEWRITER
     =================================================== */
  const roleText = document.getElementById('roleText');
  const roles = [
    'Front-End Developer',
    'Pixel Art Enthusiast',
    'UI Animation Engineer',
    'Retro Game Fan'
  ];

  function typewriterLoop() {
    if (!roleText || reduceMotion) return;

    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        if (charIndex > current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          charIndex = 0;
        }
      }

      roleText.textContent = roles[roleIndex].slice(0, charIndex);
      setTimeout(tick, deleting ? 40 : 70);
    }

    charIndex = 0;
    setTimeout(tick, 900);
  }

  typewriterLoop();

  /* ===================================================
     TERMINAL TYPEWRITER
     =================================================== */
  const termBody = document.getElementById('termBody');

  const termScript = [
    { t: 'const', c: 'k' }, { t: ' developer = {\n', c: '' },
    { t: '  name', c: '' }, { t: ': ', c: '' }, { t: "'Antonio Napoletano'", c: 's' }, { t: ',\n', c: '' },
    { t: '  role', c: '' }, { t: ': ', c: '' }, { t: "'Front-End Developer & UI Designer'", c: 's' }, { t: ',\n', c: '' },
    { t: '  loves', c: '' }, { t: ': [', c: '' }, { t: "'Basketball'", c: 's' }, { t: ', ', c: '' }, { t: "'Music'", c: 's' }, { t: ', ', c: '' }, { t: "'Coding'", c: 's' }, { t: '],\n', c: '' },
    { t: '  status', c: '' }, { t: ': ', c: '' }, { t: "'Always Available'", c: 's' }, { t: '\n', c: '' },
    { t: '};', c: '' }
  ];

  function renderTerminal() {
    if (!termBody) return;

    if (reduceMotion) {
      termBody.innerHTML = termScript
        .map(part => part.c ? `<span class="${part.c}">${part.t}</span>` : part.t)
        .join('');
      return;
    }

    let partIndex = 0;
    let charIndex = 0;
    let html = '';

    function tick() {
      if (partIndex >= termScript.length) {
        termBody.innerHTML = html + '<span class="term-cursor"></span>';
        return;
      }

      const part = termScript[partIndex];
      charIndex++;

      const soFar = part.t.slice(0, charIndex);
      const rendered = html + (part.c ? `<span class="${part.c}">${soFar}</span>` : soFar);
      termBody.innerHTML = rendered + '<span class="term-cursor"></span>';

      if (charIndex >= part.t.length) {
        html += part.c ? `<span class="${part.c}">${part.t}</span>` : part.t;
        partIndex++;
        charIndex = 0;
      }

      setTimeout(tick, 14);
    }

    setTimeout(tick, 1600);
  }

  renderTerminal();

  /* ===================================================
     SCROLL REVEAL + STAT BARS
     =================================================== */
  const revealEls = document.querySelectorAll('.reveal');
  const statFills = document.querySelectorAll('.stat-fill');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));

    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = `${fill.dataset.value}%`;
          statObserver.unobserve(fill);
        }
      });
    }, { threshold: 0.4 });

    statFills.forEach(fill => statObserver.observe(fill));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
    statFills.forEach(fill => { fill.style.width = `${fill.dataset.value}%`; });
  }

  /* ===================================================
     CART TILT — 3D pixel-cartridge hover
     =================================================== */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.cart').forEach(cart => {
      cart.addEventListener('mousemove', (e) => {
        const rect = cart.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        cart.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateZ(6px)`;
      });

      cart.addEventListener('mouseleave', () => {
        cart.style.transform = '';
      });
    });
  }

  /* ===================================================
     MOBILE NAV
     =================================================== */
  const burgerBtn = document.getElementById('burgerBtn');
  const navScrim = document.getElementById('navScrim');
  const navLinks = document.getElementById('navLinks');

  function closeNav() {
    document.body.classList.remove('nav-open');
    if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    const isOpen = document.body.classList.toggle('nav-open');
    if (burgerBtn) burgerBtn.setAttribute('aria-expanded', String(isOpen));
  }

  if (burgerBtn) burgerBtn.addEventListener('click', toggleNav);
  if (navScrim) navScrim.addEventListener('click', closeNav);
  if (navLinks) {
    navLinks.querySelectorAll('[data-close]').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

/* ===================================================
   CONTACT FORM — Integrazione EmailJS
   =================================================== */

/* ===================================================
   CONTACT FORM — Integrazione EmailJS
   =================================================== */

(function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('sentMsg'); 
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ora questi querySelector funzioneranno perché abbiamo aggiunto name="" nell'HTML
    const name  = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const msg   = form.querySelector('[name="message"]').value.trim();

    // Validazione campi
    if (!name || !email || !msg) {
      showFeedback('⚠️ Compila tutti i campi.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFeedback('⚠️ Email non valida.', 'error');
      return;
    }

    const btn = form.querySelector('.submit-btn');
    const btnText = btn.querySelector('.btn-text');
    
    // Stato di caricamento
    btn.style.opacity = '0.6';
    btn.style.pointerEvents = 'none';
    if (btnText) {
        btnText.textContent = 'Invio in corso...';
    } else {
        btn.textContent = 'Invio in corso...'; // Fallback di sicurezza
    }

    try {
      await emailjs.sendForm(
        '0203902_anto',   
        'template_gt2pux8',  
        form,                
        'pG1Obo4krnQ5alTI0'    
      );

      showFeedback('✅ Messaggio inviato, RISPONDO PRESTO!', 'success');
      form.reset();
    } catch (error) {
      console.error('Errore durante l\'invio con EmailJS:', error);
      showFeedback('❌ Errore durante l\'invio. Riprova più tardi.', 'error');
    } finally {
      // Ripristina il bottone a prescindere dal risultato
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
      if (btnText) {
          btnText.textContent = 'Invia Messaggio';
      } else {
          btn.textContent = 'Invia Messaggio ▶'; // Fallback di sicurezza
      }
    }
  });

  function showFeedback(text, type) {
    if (!feedback) return;
    
    // Imposta il testo
    feedback.textContent = text;
    feedback.className   = 'sent-msg ' + type; 
    
    // FORZA LA VISIBILITÀ (bypassando eventuali blocchi CSS)
    feedback.style.display = 'block';
    feedback.style.opacity = '1';
    feedback.style.marginTop = '15px'; // Diamo un po' di spazio
    
    // Cambia colore in base al successo o all'errore
    if (type === 'success') {
        feedback.style.color = '#4ade80'; // Verde fluo in stile retro/pixel
    } else {
        feedback.style.color = '#ff2f74'; // Rosso/Rosa per errore
    }
    
    // Nascondi di nuovo dopo 5 secondi
    setTimeout(() => {
      feedback.textContent = '';
      feedback.className   = 'sent-msg';
      feedback.style.display = 'none'; // Lo facciamo sparire
      feedback.style.opacity = '0';
    }, 5000);
  }
})();
  /* ===================================================
     CURSOR SPARK TRAIL — elite ambient pixel trail
     =================================================== */
  const trailCanvas = document.getElementById('cursor-trail');

  if (trailCanvas && trailCanvas.getContext && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    const tctx = trailCanvas.getContext('2d');
    let sparks = [];
    let tw, th;

    function resizeTrail() {
      tw = trailCanvas.width = window.innerWidth;
      th = trailCanvas.height = window.innerHeight;
    }

    const sparkColors = ['#ff2f74', '#29f2ea', '#ffcb3d'];

    window.addEventListener('mousemove', (e) => {
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: 3 + Math.random() * 3,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)]
      });
      if (sparks.length > 40) sparks.shift();
    });

    function drawTrail() {
      tctx.clearRect(0, 0, tw, th);
      sparks.forEach(s => {
        tctx.globalAlpha = Math.max(s.life, 0);
        tctx.fillStyle = s.color;
        tctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
        s.life -= 0.045;
        s.y -= 0.4;
      });
      sparks = sparks.filter(s => s.life > 0);
      tctx.globalAlpha = 1;
      requestAnimationFrame(drawTrail);
    }

    window.addEventListener('resize', resizeTrail);
    resizeTrail();
    requestAnimationFrame(drawTrail);
  }
})();