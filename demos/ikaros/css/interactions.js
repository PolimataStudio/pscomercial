// interactions.js - IKAROS Landing Page
// Interações do usuário

// ============================================
// 1. MAGNETIC BUTTONS
// ============================================

function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-magnetic');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const strength = 0.15;
      const rotateX = -(y / rect.height) * 5;
      const rotateY = (x / rect.width) * 5;
      
      btn.style.transform = `
        translate(${x * strength}px, ${y * strength}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';
    });
  });
}

document.addEventListener('DOMContentLoaded', initMagneticButtons);

// ============================================
// 2. GLOW FOLLOW (cursor)
// ============================================

function initGlowFollow() {
  const container = document.querySelector('.glow-container');
  if (!container) return;
  
  const glow = document.createElement('div');
  glow.className = 'glow-follow';
  glow.style.cssText = `
    position: fixed;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212,168,71,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: var(--z-tooltip);
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
    will-change: transform;
  `;
  
  document.body.appendChild(glow);
  
  let x = 0;
  let y = 0;
  let currentX = 0;
  let currentY = 0;
  
  document.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
  });
  
  // Smooth follow
  function updateGlow() {
    currentX += (x - currentX) * 0.08;
    currentY += (y - currentY) * 0.08;
    
    glow.style.transform = `translate(${currentX - 100}px, ${currentY - 100}px)`;
    requestAnimationFrame(updateGlow);
  }
  
  updateGlow();
  
  // Interage com elementos interativos
  document.querySelectorAll('a, button, .btn, .card, .virtue-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      glow.style.width = '300px';
      glow.style.height = '300px';
      glow.style.background = 'radial-gradient(circle, rgba(212,168,71,0.15