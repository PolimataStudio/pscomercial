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
    this.element.textContent = '';
    if (this.cursor) this.element.classList.add('typing-cursor');
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
        if (this.cursor) this.element.classList.remove('typing-cursor');
        if (this.loop) setTimeout(() => { this.reset(); this.play(); }, 2000);
      }
    };
    setTimeout(type, this.delay);
  }
  
  reset() {
    this.isPlaying = false;
    this.isDone = false;
    this.element.textContent = '';
    if (this.cursor) this.element.classList.remove('typing-cursor');
  }
}

// ============================================
// 2. COUNTER (já está em script.js, mas mantemos compatibilidade)
// ============================================

// ============================================
// 3. TYPEWRITER
// ============================================

function createTypewriter(element, options = {}) {
  const words = options.words || element.getAttribute('data-words')?.split(',') || [];
  const speed = parseInt(element.getAttribute('data-speed')) || options.speed || 100;
  const pause = parseInt(element.getAttribute('data-pause')) || options.pause || 1500;
  const loop = element.getAttribute('data-loop') !== 'false';
  if (!words.length) return;
  let wordIndex = 0, charIndex = 0, isDeleting = false, isPaused = false;
  function type() {
    const currentWord = words[wordIndex];
    const isComplete = charIndex === currentWord.length;
    if (isDeleting) {
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
      if (isComplete) {
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

// ============================================
// 4. INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-typing]').forEach(el => {
    const text = el.getAttribute('data-typing-text') || el.textContent;
    const speed = parseInt(el.getAttribute('data-typing-speed')) || 60;
    const delay = parseInt(el.getAttribute('data-typing-delay')) || 0;
    const loop = el.getAttribute('data-typing-loop') === 'true';
    const typing = new TypingEffect(el, { text, speed, delay, loop });
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !typing.isDone) {
          typing.play();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 }).observe(el);
  });
  document.querySelectorAll('[data-typewriter]').forEach(el => createTypewriter(el));
});