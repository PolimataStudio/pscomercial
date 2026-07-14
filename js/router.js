// js/router.js
// Roteamento simples para navegação interna (SPA opcional, mas mantido)

export function initRouter() {
  const resolver = window.PathResolver;
  if (!resolver) return;

  // Se houver links com data-router, tratar
  document.querySelectorAll('a[data-router]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) {
        const resolved = resolver.resolveLink(href);
        window.location.href = resolved;
      }
    });
  });

  // Para todos os links internos (que não sejam externos ou âncoras), podemos
  // interceptar e usar o resolvedor (opcional)
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
      // Se o link não estiver usando data-router, não interceptamos,
      // apenas garantimos que o href seja resolvido (já feito no HTML)
      // Isso é feito pelo loadComponents que reescreve os links do navbar/footer.
    }
  });

  console.log('[Router] Inicializado (navegação multi-página).');
}