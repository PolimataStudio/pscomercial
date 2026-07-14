// effects.js - IKAROS Landing Page
// Efeitos visuais

// ============================================
// 1. ESTRELAS (Background)
// ============================================

function createStars() {
  const container = document.querySelector('.stars-container');
  if (!container) return;
  
  const count = 200;
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;
    
    star.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      animation: twinkle ${duration}s ease-in-out ${delay}s infinite alternate;
      opacity: ${Math.random() * 0.5 + 0.3};
    `;
    
    fragment.appendChild(star);
  }
  
  container.appendChild(fragment);
}

// Inicializa estrelas
document.addEventListener('DOMContentLoaded', createStars);

// ============================================
// 2. NÉVOA / FOG (Parallax)
// ============================================

function createFog() {
  const container = document.querySelector('.fog-container');
  if (!container) return;
  
  const layers = [
    { speed: 0.02, opacity: 0.03, blur: 2 },
    { speed: 0.04, opacity: 0.02, blur: 4 },
    { speed: 0.01, opacity: 0.04, blur: 1 }
  ];
  
  layers.forEach((layer, index) => {
    const el = document.createElement('div');
    el.className = `fog-layer fog-${index}`;
    el.style.cssText = `
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at ${20 + index * 30}% ${30 + index * 10}%, rgba(200, 220, 255, ${layer.opacity}) 0%, transparent 70%);
      filter: blur(${layer.blur}px);
      pointer-events: none;
      transform: translateX(${index * 20}px);
      will-change: transform;
    `;
    
    container.appendChild(el);
  });
  
  // Anima a névoa
  let x = 0;
  function animateFog() {
    x += 0.1;
    const fogLayers = container.querySelectorAll('.fog-layer');
    fogLayers.forEach((layer, i) => {
      const speed = [0.02, 0.04, 0.01][i];
      const offset = Math.sin(x * speed + i) * 30;
      layer.style.transform = `translateX(${offset}px)`;
    });
    requestAnimationFrame(animateFog);
  }
  
  animateFog();
}

// Inicializa névoa
document.addEventListener('DOMContentLoaded', createFog);

// ============================================
// 3. GLOW ORBS (background)
// ============================================

function createGlowOrbs() {
  const container = document.querySelector('.glow-orbs-container');
  if (!container) return;
  
  const orbs = [
    { color: 'var(--color-accent)', size: 300, x: 10, y: 20, delay: 0 },
    { color: 'var(--color-silver)', size: 250, x: 80, y: 10, delay: 2 },
    { color: '#4a9eff', size: 280, x: 50, y: 80, delay: 4 }
  ];
  
  orbs.forEach((orb, index) => {
    const el = document.createElement('div');
    el.className = 'glow-orb';
    el.style.cssText = `
      position: absolute;
      left: ${orb.x}%;
      top: ${orb.y}%;
      width: ${orb.size}px;
      height: ${orb.size}px;
      border-radius: 50%;
      background: ${orb.color};
      filter: blur(80px);
      opacity: 0.1;
      pointer-events: none;
      animation: floatOrb ${8 + index * 2}s ease-in-out ${orb.delay}s infinite;
      will-change: transform;
    `;
    
    container.appendChild(el);
  });
  
  // Adiciona keyframes para flutuação
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatOrb {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      25% {
        transform: translate(20px, -30px) scale(1.1);
      }
      50% {
        transform: translate(-10px, 20px) scale(0.9);
      }
      75% {
        transform: translate(30px, 10px) scale(1.05);
      }
    }
  `;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', createGlowOrbs);

// ============================================
// 4. SCROLL-BASED REVEAL (completar)
// ============================================

function initAdvancedReveal() {
  const elements = document.querySelectorAll('[data-reveal-advanced]');
  
  if (!elements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const direction = el.getAttribute('data-reveal-advanced') || 'up';
        const delay = parseInt(el.getAttribute('data-delay')) || 0;
        
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);
        
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initAdvancedReveal);

// ============================================
// 5. PARTICLES (click / interaction)
// ============================================

function createClickParticles(e) {
  const container = document.querySelector('.particles-click-container');
  if (!container) return;
  
  const colors = ['#d4a847', '#c0c0c0', '#f0f4ff', '#4a9eff', '#ffbf00'];
  const count = 12;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 3;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 80 + 40;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 10px ${color}40;
    `;
    
    container.appendChild(particle);
    
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;
    const duration = Math.random() * 800 + 400;
    const startTime = performance.now();
    
    function animateParticle(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const x = dx * eased;
      const y = dy * eased - 30 * eased;
      const opacity = 1 - eased;
      const scale = 1 - eased * 0.5;
      
      particle.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      particle.style.opacity = opacity;
      
      if (progress < 1) {
        requestAnimationFrame(animateParticle);
      } else {
        particle.remove();
      }
    }
    
    requestAnimationFrame(animateParticle);
  }
}

// Ativa clique em elementos interativos
document.addEventListener('click', (e) => {
  const target = e.target.closest('a, button, .btn, .card, .virtue-card');
  if (target) {
    createClickParticles(e);
  }
});

// ============================================
// 6. TEXT GLOW (gradient text animation)
// ============================================

function initTextGlow() {
  const elements = document.querySelectorAll('.text-glow-animated');
  
  elements.forEach(el => {
    el.classList.add('text-glow-animated');
    el.style.backgroundImage = `
      linear-gradient(
        90deg,
        var(--color-accent) 0%,
        var(--color-accent-light) 25%,
        var(--color-accent) 50%,
        var(--color-accent-light) 75%,
        var(--color-accent) 100%
      )
    `;
    el.style.backgroundSize = '200% auto';
    el.style.backgroundClip = 'text';
    el.style.webkitBackgroundClip = 'text';
    el.style.color = 'transparent';
    el.style.animation = 'shimmerText 3s linear infinite';
  });
  
  // Adiciona keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shimmerText {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
  `;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', initTextGlow);