// animations.js - IKAROS Landing Page
// Animações avançadas

// ============================================
// 1. TYPING EFFECT
// ============================================

class TypingEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.text = options.text || element.textContent;
    this.speed = options.speed || 60;
    this.delay = options.delay || 0;
    this.loop = options.loop || false;
    this.cursor = options.cursor !== undefined ? options.cursor : true;
    
    this.isPlaying = false;
    this.isDone = false;
  }
  
  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.isDone = false;
    
    // Limpa o elemento
    this.element.textContent = '';
    
    // Adiciona cursor
    if (this.cursor) {
      this.element.classList.add('typing-cursor');
    }
    
    let index = 0;
    const chars = this.text.split('');
    
    const type = () => {
      if (index < chars.length) {
        this.element.textContent += chars[index];
        index++;
        setTimeout(type, this.speed);
      } else {
        this.isPlaying = false;
        this.isDone = true;
        if (this.cursor) {
          this.element.classList.remove('typing-cursor');
        }
        if (this.loop) {
          setTimeout(() => {
            this.element.textContent = '';
            this.isPlaying = false;
            this.play();
          }, 2000);
        }
      }
    };
    
    setTimeout(type, this.delay);
  }
  
  reset() {
    this.isPlaying = false;
    this.isDone = false;
    this.element.textContent = '';
    if (this.cursor) {
      this.element.classList.remove('typing-cursor');
    }
  }
}

// Inicializa typing effects
document.addEventListener('DOMContentLoaded', () => {
  const typingElements = document.querySelectorAll('[data-typing]');
  typingElements.forEach(el => {
    const text = el.getAttribute('data-typing-text') || el.textContent;
    const speed = parseInt(el.getAttribute('data-typing-speed')) || 60;
    const delay = parseInt(el.getAttribute('data-typing-delay')) || 0;
    const loop = el.getAttribute('data-typing-loop') === 'true';
    
    const typing = new TypingEffect(el, { text, speed, delay, loop });
    
    // Inicia quando visível
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !typing.isDone) {
          typing.play();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(el);
  });
});

// ============================================
// 2. PARALLAX SCROLL
// ============================================

class Parallax {
  constructor(element, options = {}) {
    this.element = element;
    this.speed = options.speed || 0.3;
    this.direction = options.direction || 'vertical';
    this.startOffset = options.startOffset || 0;
    this.endOffset = options.endOffset || 0;
    
    this.isActive = true;
    this.bounds = null;
    
    this.updateBounds();
    this.bindEvents();
  }
  
  updateBounds() {
    this.bounds = this.element.getBoundingClientRect();
  }
  
  bindEvents() {
    window.addEventListener('scroll', () => this.update());
    window.addEventListener('resize', () => this.updateBounds());
  }
  
  update() {
    if (!this.isActive) return;
    
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const rect = this.bounds;
    
    if (!rect) return;
    
    const offset = rect.top + scrollY;
    const distance = scrollY - offset + window.innerHeight;
    const maxDistance = rect.height + window.innerHeight;
    
    const progress = Math.max(0, Math.min(1, distance / maxDistance));
    const offsetPx = (progress - 0.5) * this.speed * 100;
    
    if (this.direction === 'vertical') {
      this.element.style.transform = `translateY(${offsetPx}px)`;
    } else if (this.direction === 'horizontal') {
      this.element.style.transform = `translateX(${offsetPx}px)`;
    }
  }
}

// Inicializa parallax
document.addEventListener('DOMContentLoaded', () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.3;
    const direction = el.getAttribute('data-parallax-direction') || 'vertical';
    
    new Parallax(el, { speed, direction });
  });
});

// ============================================
// 3. COUNTER ANIMATION
// ============================================

class Counter {
  constructor(element, options = {}) {
    this.element = element;
    this.target = parseInt(element.getAttribute('data-target') || options.target || element.textContent.replace(/\D/g, ''));
    this.duration = parseInt(element.getAttribute('data-duration') || options.duration || 2000);
    this.suffix = element.getAttribute('data-suffix') || options.suffix || '';
    this.prefix = element.getAttribute('data-prefix') || options.prefix || '';
    this.decimals = parseInt(element.getAttribute('data-decimals') || options.decimals || 0);
    
    this.isPlaying = false;
    this.isDone = false;
  }
  
  play() {
    if (this.isPlaying || this.isDone) return;
    this.isPlaying = true;
    
    const start = 0;
    const startTime = performance.now();
    
    const update = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Easing easeOutQuad
      const eased = 1 - Math.pow(1 - progress, 2);
      const current = eased * this.target;
      
      const formatted = current.toFixed(this.decimals);
      this.element.textContent = `${this.prefix}${formatted}${this.suffix}`;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        this.element.textContent = `${this.prefix}${this.target.toFixed(this.decimals)}${this.suffix}`;
        this.isPlaying = false;
        this.isDone = true;
      }
    };
    
    requestAnimationFrame(update);
  }
  
  reset() {
    this.isPlaying = false;
    this.isDone = false;
    this.element.textContent = `${this.prefix}0${this.suffix}`;
  }
}

// Inicializa contadores
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-counter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target._counter;
        if (counter && !counter.isDone) {
          counter.play();
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(el => {
    const counter = new Counter(el);
    el._counter = counter;
    observer.observe(el);
  });
});

// ============================================
// 4. TYPEWRITER (alternativo)
// ============================================

function createTypewriter(element, options = {}) {
  const words = options.words || element.getAttribute('data-words')?.split(',') || [];
  const speed = parseInt(element.getAttribute('data-speed')) || options.speed || 100;
  const pause = parseInt(element.getAttribute('data-pause')) || options.pause || 1500;
  const loop = element.getAttribute('data-loop') !== 'false';
  
  if (!words.length) return;
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  
  function type() {
    const currentWord = words[wordIndex];
    const isComplete = charIndex === currentWord.length;
    
    if (isDeleting) {
      // Deletando
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        if (!loop && wordIndex === 0) return;
        setTimeout(type, 300);
        return;
      }
      
      setTimeout(type, speed / 2);
    } else {
      // Digitando
      if (isComplete) {
        // Palavra completa, pausa
        if (isPaused) {
          isPaused = false;
          isDeleting = true;
          setTimeout(type, speed / 2);
          return;
        }
        
        isPaused = true;
        setTimeout(type, pause);
        return;
      }
      
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Inicializa typewriters
document.addEventListener('DOMContentLoaded', () => {
  const typewriters = document.querySelectorAll('[data-typewriter]');
  typewriters.forEach(el => {
    createTypewriter(el);
  });
});

// ============================================
// 5. SCROLL-BASED PARALLAX (background)
// ============================================

function initScrollParallax() {
  const sections = document.querySelectorAll('[data-parallax-bg]');
  
  sections.forEach(section => {
    const speed = parseFloat(section.getAttribute('data-parallax-speed')) || 0.3;
    const bg = section.querySelector('[data-parallax-image]');
    if (!bg) return;
    
    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect.top + scrollY;
      const distance = scrollY - offset;
      
      bg.style.transform = `translateY(${distance * speed}px)`;
    });
  });
}

document.addEventListener('DOMContentLoaded', initScrollParallax);