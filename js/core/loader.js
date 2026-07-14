export async function loadComponent(placeholderId, componentName) {
  const element = document.getElementById(placeholderId);
  if (!element) return;
  if (!window.PathResolver) {
    console.warn('[Loader] PathResolver não disponível');
    return;
  }
  const url = window.PathResolver.resolveComponent(componentName);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} — ${url}`);
    let html = await response.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.querySelectorAll('a[href]').forEach(link => {
      let href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        link.setAttribute('href', window.PathResolver.resolveLink(href));
      }
    });
    tempDiv.querySelectorAll('img[src]').forEach(img => {
      let src = img.getAttribute('src');
      if (src && !src.startsWith('http')) img.setAttribute('src', window.PathResolver.resolveLink(src));
    });
    element.innerHTML = tempDiv.innerHTML;
  } catch (e) {
    console.warn(`Falha ao carregar ${componentName}:`, e);
    element.innerHTML = '';
  }
}