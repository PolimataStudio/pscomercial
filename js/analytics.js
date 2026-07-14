// js/analytics.js
export function initAnalytics() {
  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => {
      const event = el.dataset.track;
      console.log('[Analytics] Evento:', event);
    });
  });
}