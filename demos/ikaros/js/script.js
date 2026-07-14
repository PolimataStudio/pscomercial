// script.js - IKAROS Landing Page
// Principal arquivo JavaScript

// ============================================
// 1. EXPORTAÇÃO E CONFIGURAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
  // Inicializa todos os módulos
  initHeader();
  initScrollReveal();
  initParticles();
  initScrollProgress();
  initClockAnimation();
  initCounterAnimation(); // <-- CORRIGIDO
  initForm();
  initParallax();
  initSmoothScroll();
  initLazyLoad();
  
  console.log('🔮 IKAROS - A Contagem do Destino');
  console.log('📖 Landpage carregada com sucesso!');
});

// ============================================
// 2. HEADER / NAVBAR
// ============================================

function initHeader() {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!header) return;
  
  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
}

// ============================================
// 3. SCROLL REVEAL (Intersection Observer)
// ============================================

function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal], [data-stagger], [data-animate]');
  
  if (!elements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adiciona classe 'visible' para animação
        entry.target.classList.add('visible');
        
        // Para elementos com data-stagger, aplica stagger
        if (entry.target.hasAttribute('data-stagger')) {
          const children = entry.target.querySelectorAll('*');
          children.forEach((child, index) => {
            child.style.transitionDelay = `${0.05 * (index + 1)}s`;
          });
        }
        
        // Para elementos com data-animate, aplica a classe de animação
        if (entry.target.hasAttribute('data-animate')) {
          const animation = entry.target.getAttribute('data-animate');
          entry.target.classList.add(`animate-${animation}`);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// ============================================
// 4. PARTÍCULAS (Estrelas)
// ============================================

function initParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;
  
  const count = 50;
  const colors = ['#d4a847', '#c0c0c0', '#f0f4ff', '#4a9eff'];
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 10;
    const drift = (Math.random() - 0.5) * 100;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      left: ${x}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      --duration: ${duration}s;
      animation-delay: ${delay}s;
      --drift: ${drift}px;
    `;
    
    container.appendChild(particle);
  }
}

// ============================================
// 5. SCROLL PROGRESS
// ============================================

function initScrollProgress() {
  const progress = document.querySelector('.scroll-progress');
  if (!progress) return;
  
  const circle = progress.querySelector('circle');
  if (!circle) return;
  
  const totalLength = 132; // 2 * PI * 21 (raio)
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    // Atualiza círculo
    const offset = totalLength - (scrollPercent / 100) * totalLength;
    circle.style.strokeDashoffset = offset;
    
    // Atualiza texto
    progress.textContent = `${Math.round(scrollPercent)}%`;
    
    // Mostra/esconde
    if (scrollTop > 300) {
      progress.classList.add('visible');
    } else {
      progress.classList.remove('visible');
    }
  });
  
  // Click para voltar ao topo
  progress.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// 6. RELÓGIO ANIMADO (SVG)
// ============================================

function initClockAnimation() {
  const clock = document.querySelector('.clock-display');
  if (!clock) return;
  
  const svg = clock.querySelector('svg');
  if (!svg) return;
  
  // Atualiza os ponteiros em tempo real
  function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;
    const minuteDeg = (minutes / 60) * 360;
    const secondDeg = (seconds / 60) * 360;
    
    const hourHand = svg.querySelector('.hour-hand');
    const minuteHand = svg.querySelector('.minute-hand');
    const secondHand = svg.querySelector('.second-hand');
    
    if (hourHand) hourHand.setAttribute('transform', `rotate(${hourDeg} 60 60)`);
    if (minuteHand) minuteHand.setAttribute('transform', `rotate(${minuteDeg} 60 60)`);
    if (secondHand) secondHand.setAttribute('transform', `rotate(${secondDeg} 60 60)`);
  }
  
  updateClock();
  setInterval(updateClock, 1000);
}

// ============================================
// 7. COUNTER ANIMATION - CORRIGIDO
// ============================================

function initCounterAnimation() {
  // Seleciona todos os elementos com data-counter
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  
  // Para cada contador, extrai os dados e anima
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/\D/g, ''));
    const duration = parseInt(counter.getAttribute('data-duration') || 2000);
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';
    const decimals = parseInt(counter.getAttribute('data-decimals') || 0);
    
    if (!target) return;
    
    // Observa quando o elemento entra na viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(counter, target, duration, suffix, prefix, decimals);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(counter);
  });
}

function animateCounter(el, target, duration, suffix, prefix, decimals) {
  const start = 0;
  const startTime = performance.now();
  
  function update(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing easeOutQuad
    const eased = 1 - Math.pow(1 - progress, 2);
    const current = eased * target;
    
    // Formata com decimais e adiciona prefixo/sufixo
    const formatted = current.toFixed(decimals);
    el.textContent = `${prefix}${formatted}${suffix}`;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // Valor final
      const finalFormatted = target.toFixed(decimals);
      el.textContent = `${prefix}${finalFormatted}${suffix}`;
    }
  }
  
  requestAnimationFrame(update);
}

// ============================================
// 8. FORMULÁRIO (StaticForms)
// ============================================

function initForm() {
  const form = document.querySelector('.cta-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Desabilita botão
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        // Sucesso
        submitBtn.textContent = '✓ Enviado!';
        submitBtn.style.background = '#00665b';
        submitBtn.style.borderColor = '#00665b';
        
        // Limpa o formulário
        form.reset();
        
        // Mostra mensagem de sucesso
        showFormMessage('✅ E-book enviado para seu e-mail! Verifique sua caixa de entrada.', 'success');
      } else {
        throw new Error('Erro no envio');
      }
    } catch (error) {
      console.error('Erro no formulário:', error);
      submitBtn.textContent = '❌ Erro';
      submitBtn.style.background = '#e74c3c';
      submitBtn.style.borderColor = '#e74c3c';
      
      showFormMessage('❌ Erro ao enviar. Tente novamente.', 'error');
    }
    
    // Restaura botão após 3 segundos
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.style.borderColor = '';
    }, 3000);
  });
}

function showFormMessage(message, type) {
  const container = document.querySelector('.cta-box');
  if (!container) return;
  
  const existing = container.querySelector('.form-message');
  if (existing) existing.remove();
  
  const msg = document.createElement('div');
  msg.className = `form-message ${type}`;
  msg.textContent = message;
  msg.style.cssText = `
    padding: var(--space-md);
    border-radius: var(--radius-md);
    margin-top: var(--space-md);
    font-weight: var(--font-weight-medium);
    ${type === 'success' ? 'background: rgba(0,102,91,0.15); color: var(--color-green); border: 1px solid rgba(0,102,91,0.2);' : ''}
    ${type === 'error' ? 'background: rgba(231,76,60,0.15); color: #e74c3c; border: 1px solid rgba(231,76,60,0.2);' : ''}
  `;
  
  container.appendChild(msg);
  
  setTimeout(() => {
    msg.remove();
  }, 5000);
}

// ============================================
// 9. PARALLAX
// ============================================

function initParallax() {
  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    elements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
      const rect = el.getBoundingClientRect();
      const offset = rect.top + scrollY;
      const distance = scrollY - offset;
      
      el.style.transform = `translateY(${distance * speed}px)`;
    });
  });
}

// ============================================
// 10. SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) return;
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (!target) return;
      
      e.preventDefault();
      
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// ============================================
// 11. LAZY LOAD (Imagens)
// ============================================

function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => observer.observe(img));
}

// ============================================
// 12. RIPPLE EFFECT (Botões)
// ============================================

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  
  const rect = btn.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  
  btn.style.setProperty('--mouse-x', `${x}%`);
  btn.style.setProperty('--mouse-y', `${y}%`);
});