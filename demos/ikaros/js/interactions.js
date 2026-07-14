// interactions.js - IKAROS Landing Page
// Interações do usuário

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // 1. MAGNETIC BUTTONS
  // ============================================
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.15;
      const rotateX = -(y / rect.height) * 5;
      const rotateY = (x / rect.width) * 5;
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';
    });
  });

  // ============================================
  // 2. GLOW FOLLOW (cursor)
  // ============================================
  if (window.innerWidth > 768) {
    const container = document.querySelector('.glow-container') || document.body;
    const glow = document.createElement('div');
    glow.className = 'glow-follow';
    glow.style.cssText = `
      position: fixed; width: 200px; height: 200px; border-radius: 50%;
      background: radial-gradient(circle, rgba(212,168,71,0.08) 0%, transparent 70%);
      pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s; will-change: transform;
    `;
    document.body.appendChild(glow);
    let x = 0, y = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });
    function updateGlow() {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      glow.style.transform = `translate(${cx - 100}px, ${cy - 100}px)`;
      requestAnimationFrame(updateGlow);
    }
    updateGlow();
    document.querySelectorAll('a, button, .btn, .card, .virtue-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        glow.style.width = '300px';
        glow.style.height = '300px';
        glow.style.background = 'radial-gradient(circle, rgba(212,168,71,0.15) 0%, transparent 70%)';
      });
      el.addEventListener('mouseleave', () => {
        glow.style.width = '200px';
        glow.style.height = '200px';
        glow.style.background = 'radial-gradient(circle, rgba(212,168,71,0.08) 0%, transparent 70%)';
      });
    });
  }

  // ============================================
  // 3. FLOATING ELEMENTS
  // ============================================
  document.querySelectorAll('.float-element').forEach((el, i) => {
    const duration = 3 + Math.random() * 2;
    const delay = Math.random() * 2;
    const amplitude = 10 + Math.random() * 15;
    el.style.animation = `floatElement ${duration}s ease-in-out ${delay}s infinite`;
    el.style.setProperty('--amplitude', `${amplitude}px`);
  });
  // Adiciona keyframe dinâmico
  const style = document.createElement('style');
  style.textContent = `@keyframes floatElement { 0%,100% { transform: translateY(0); } 50% { transform: translateY(var(--amplitude)); } }`;
  document.head.appendChild(style);

  // ============================================
  // 4. TILT EFFECT
  // ============================================
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * 10;
      const rotateY = (x - 0.5) * -10;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // ============================================
  // 5. SCROLL INDICATOR
  // ============================================
  const indicator = document.querySelector('.scroll-indicator');
  if (indicator) {
    const hero = document.querySelector('.hero');
    if (hero) {
      new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          indicator.style.opacity = entry.isIntersecting ? '1' : '0';
          indicator.style.pointerEvents = entry.isIntersecting ? 'auto' : 'none';
        });
      }, { threshold: 0.8 }).observe(hero);
      indicator.addEventListener('click', () => {
        const next = hero.nextElementSibling;
        if (next) next.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }
});