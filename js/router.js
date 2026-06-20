export function initRouter() {
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        // Permitir navegação padrão
      });
    }
  });
  console.log('Router initialized (demos supported).');
}