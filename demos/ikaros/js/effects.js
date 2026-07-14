// effects.js - IKAROS Landing Page
// Efeitos visuais

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. ESTRELAS
  // ============================================
  const starContainer = document.querySelector('.stars-container');
  if (starContainer) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 5;
      star.style.cssText = `
        position: absolute; left: ${x}%; top: ${y}%;
        width: ${size}px; height: ${size}px;
        background: white; border-radius: 50%;
        animation: twinkle ${duration}s ease-in-out ${delay}s infinite alternate;
        opacity: ${Math.random() * 0.5 + 0.3};
      `;
      fragment.appendChild(star);
    }
    starContainer.appendChild(fragment);
  }

  // ============================================
  // 2. NÉVOA
  // ============================================
  const fogContainer = document.querySelector('.fog-container');
  if (fogContainer) {
    const layers = [
      { speed: 0.02, opacity: 0.03, blur: 2 },
      { speed: 0.04, opacity: 0.02, blur: 4 },
      { speed: 0.01, opacity: 0.04, blur: 1 }
    ];
    layers.forEach((layer, i) => {
      const el = document.createElement('div');
      el.className = `fog-layer fog-${i}`;
      el.style.cssText = `
        position: absolute; inset: 0;
        background: radial-gradient(ellipse at ${20 + i * 30}% ${30 + i * 10}%, rgba(200,220,255,${layer.opacity}) 0%, transparent 70%);
        filter: blur(${layer.blur}px); pointer-events: none;
        transform: translateX(${i * 20}px); will-change: transform;
      `;
      fogContainer.appendChild(el);
    });
    let x = 0;
    function animateFog() {
      x += 0.1;
      fogContainer.querySelectorAll('.fog-layer').forEach((el, i) => {
        const speed = [0.02, 0.04, 0.01][i];
        el.style.transform = `translateX(${Math.sin(x * speed + i) * 30}px)`;
      });
      requestAnimationFrame(animateFog);
    }
    animateFog();
  }

  // ============================================
  // 3. GLOW ORBS
  // ============================================
  const orbsContainer = document.querySelector('.glow-orbs-container');
  if (orbsContainer) {
    const orbs = [
      { color: '#d4a847', size: 300, x: 10, y: 20, delay: 0 },
      { color: '#c0c0c0', size: 250, x: 80, y: 10, delay: 2 },
      { color: '#4a9eff', size: 280, x: 50, y: 80, delay: 4 }
    ];
    orbs.forEach((orb, i) => {
      const el = document.createElement('div');
      el.className = 'glow-orb';
      el.style.cssText = `
        position: absolute; left: ${orb.x}%; top: ${orb.y}%;
        width: ${orb.size}px; height: ${orb.size}px;
        border-radius: 50%; background: ${orb.color};
        filter: blur(80px); opacity: 0.1; pointer-events: none;
        animation: floatOrb ${8 + i * 2}s ease-in-out ${orb.delay}s infinite;
        will-change: transform;
      `;
      orbsContainer.appendChild(el);
    });
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatOrb {
        0%,100% { transform: translate(0,0) scale(1); }
        25% { transform: translate(20px,-30px) scale(1.1); }
        50% { transform: translate(-10px,20px) scale(0.9); }
        75% { transform: translate(30px,10px) scale(1.05); }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================
  // 4. SCROLL REVEAL (avançado)
  // ============================================
  document.querySelectorAll('[data-reveal-advanced]').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(el.getAttribute('data-delay')) || 0;
          setTimeout(() => el.classList.add('revealed'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(el);
  });

  // ============================================
  // 5. CLICK PARTICLES
  // ============================================
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, .btn, .card, .virtue-card');
    if (!target) return;
    const container = document.querySelector('.particles-click-container') || document.body;
    const colors = ['#d4a847', '#c0c0c0', '#f0f4ff', '#4a9eff', '#ffbf00'];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 6 + 3;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 80 + 40;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
        width: ${size}px; height: ${size}px;
        background: ${color}; border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none; z-index: 9999;
        box-shadow: 0 0 10px ${color}40;
      `;
      container.appendChild(p);
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      const duration = Math.random() * 800 + 400;
      const start = performance.now();
      function animateParticle(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const x = dx * eased;
        const y = dy * eased - 30 * eased;
        const opacity = 1 - eased;
        const scale = 1 - eased * 0.5;
        p.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        p.style.opacity = opacity;
        if (progress < 1) requestAnimationFrame(animateParticle);
        else p.remove();
      }
      requestAnimationFrame(animateParticle);
    }
  });

  // ============================================
  // 6. TEXT GLOW
  // ============================================
  document.querySelectorAll('.text-glow-animated').forEach(el => {
    el.style.backgroundImage = `
      linear-gradient(90deg, #d4a847 0%, #f0d080 25%, #d4a847 50%, #f0d080 75%, #d4a847 100%)
    `;
    el.style.backgroundSize = '200% auto';
    el.style.backgroundClip = 'text';
    el.style.webkitBackgroundClip = 'text';
    el.style.color = 'transparent';
    el.style.animation = 'shimmerText 3s linear infinite';
  });
  const styleShimmer = document.createElement('style');
  styleShimmer.textContent = `@keyframes shimmerText { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }`;
  document.head.appendChild(styleShimmer);

  // ============================================
  // 7. KEYFRAME PARA TWINKLE (caso não exista)
  // ============================================
  if (!document.querySelector('#twinkle-style')) {
    const twinkleStyle = document.createElement('style');
    twinkleStyle.id = 'twinkle-style';
    twinkleStyle.textContent = `@keyframes twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }`;
    document.head.appendChild(twinkleStyle);
  }
});