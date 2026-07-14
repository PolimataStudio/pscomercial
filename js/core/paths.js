// js/core/paths.js
// PathResolver - Fallback (mecanismo secundário)
// O mecanismo primário é o script inline em cada página HTML.
// Este arquivo é mantido para compatibilidade, mas não é mais obrigatório.

(function(global) {
  'use strict';
  // Se o PathResolver já foi definido inline, não sobrescrever
  if (global.PathResolver && global.PathResolver.getBasePath) {
    console.log('[PathResolver] Já definido inline. Ignorando fallback.');
    return;
  }

  let BASE_PATH = global.PROJECT_BASE || null;
  if (!BASE_PATH) {
    const path = global.location.pathname;
    const match = path.match(/^(\/.*?\/)(?:demos\/|pages\/|js\/|css\/|assets\/|data\/|themes\/)/);
    BASE_PATH = match ? match[1] : '/';
  }
  if (!BASE_PATH.endsWith('/')) BASE_PATH += '/';

  function resolve(relativePath) {
    if (relativePath.startsWith(BASE_PATH)) return relativePath;
    if (relativePath.startsWith('/')) return BASE_PATH + relativePath.slice(1);
    let clean = relativePath.replace(/^\.\//, '').replace(/^\.\.\//, '');
    while (clean.startsWith('../')) clean = clean.replace(/^\.\.\//, '');
    return BASE_PATH + clean;
  }

  function resolveData(dataPath) { return resolve('data/' + dataPath); }
  function resolveComponent(componentName) {
    if (!componentName.endsWith('.html')) componentName += '.html';
    return resolve('components/' + componentName);
  }
  function resolveLink(linkPath) { return resolve(linkPath); }
  function resolveAsset(assetPath) { return resolve(assetPath); }
  function resolveDemoUrl(demo) {
    let url = (typeof demo === 'string') ? demo : (demo?.url || '');
    if (!url) return BASE_PATH + 'demos/fallback/index.html';
    if (url.startsWith('http')) return url;
    let clean = url.replace(/^\.\//, '').replace(/^\.\.\//, '');
    if (!clean.startsWith('demos/')) clean = 'demos/' + clean;
    if (!clean.endsWith('.html') && !clean.endsWith('/')) clean += '.html';
    if (clean.endsWith('index.html')) {
      const demoHtml = clean.replace(/index\.html$/, 'demo.html');
      return resolve(demoHtml);
    }
    return resolve(clean);
  }
  function prefetchDemo(demo) {
    const url = resolveDemoUrl(demo);
    if ('prefetch' in document.createElement('link')) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'document';
      document.head.appendChild(link);
    }
  }
  function getBasePath() { return BASE_PATH; }
  function isDebug() { return localStorage.getItem('path-debug') === 'true' || new URLSearchParams(window.location.search).get('debug') === 'paths'; }
  function log(...args) { if (isDebug()) console.log('[PathResolver]', ...args); }

  global.PathResolver = { resolve, resolveData, resolveComponent, resolveLink, resolveAsset, resolveDemoUrl, prefetchDemo, getBasePath, isDebug, log };
  global.PathManager = global.PathResolver;
  console.log('[PathResolver Fallback] Base definida:', BASE_PATH);
})(window);