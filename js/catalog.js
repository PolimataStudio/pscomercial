// js/catalog.js
// Módulo para o Catálogo Inteligente de Demonstrações

import { loadJSON } from './core/data-loader.js';

const PATH = window.PathResolver || window.PathManager;

export async function loadCatalogData() {
  const categories = await loadJSON('categories.json');
  const demos = await loadJSON('demos.json');
  return { categories: categories || [], demos: demos || [] };
}

export function getDemosByCategory(demos, categoryId) {
  return demos.filter(d => d.categoryId === categoryId);
}

export function getCategoryById(categories, id) {
  return categories.find(c => c.id === id);
}

export function getMacrosegments(categories) {
  if (!categories || !categories.length) return [];
  const set = new Set(categories.map(c => c.macrosegment));
  return Array.from(set).sort();
}

export function filterCategoriesByMacrosegment(categories, segment) {
  if (!segment) return categories;
  return categories.filter(c => c.macrosegment === segment);
}

export async function renderCategoryGrid(containerSelector, filterSegment = '') {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn('[Catalog] Container não encontrado:', containerSelector);
    return;
  }

  try {
    const { categories, demos } = await loadCatalogData();
    if (!categories || !categories.length) {
      container.innerHTML = `<p style="color:var(--muted);text-align:center;padding:2rem;">Nenhuma categoria encontrada.</p>`;
      return;
    }

    let filtered = filterCategoriesByMacrosegment(categories, filterSegment);
    if (filtered.length === 0) {
      container.innerHTML = `<p style="color:var(--muted);text-align:center;padding:2rem;">Nenhuma categoria encontrada para este segmento.</p>`;
      return;
    }

    container.innerHTML = filtered.map(cat => {
      const catDemos = getDemosByCategory(demos || [], cat.id);
      const count = catDemos.length;
      const previewDemos = catDemos.slice(0, 3);
      
      return `
        <div class="category-card" data-category="${cat.id}" data-macrosegment="${cat.macrosegment}">
          <div class="category-card-inner">
            <div class="category-stack">
              ${previewDemos.map((d, i) => `
                <div class="stack-layer" style="--stack-index: ${i}; background-image: url('${PATH.resolveAsset('assets/images/demo-placeholder.jpg')}');" role="img" aria-label="Pré-visualização de ${d.title}">
                  <span class="stack-label">${d.title}</span>
                </div>
              `).join('')}
              <div class="category-card-front">
                  <div class="category-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" role="img" focusable="false">
                      <use href="${PATH.resolveAsset(`assets/icons/${cat.icon}.svg`)}#icon" />
                    </svg>
                  </div>
                <h3>${cat.name}</h3>
                <p>${cat.description || ''}</p>
                <span class="category-count">${count} demonstrações${count !== 1 ? '' : ''}</span>
                <a href="${PATH.resolveLink('demos/category.html')}?cat=${cat.id}" class="btn btn-outline category-cta">Explorar demonstrações →</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.querySelector('.category-stack')?.classList.add('stack-active');
      });
      card.addEventListener('mouseleave', () => {
        card.querySelector('.category-stack')?.classList.remove('stack-active');
      });
    });

  } catch (error) {
    console.error('[Catalog] Erro ao renderizar categorias:', error);
    container.innerHTML = `<p style="color:var(--muted);text-align:center;padding:2rem;">Erro ao carregar categorias. Tente recarregar.</p>`;
  }
}

export async function renderDemosByCategory(containerSelector, categoryId) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn('[Catalog] Container não encontrado:', containerSelector);
    return;
  }

  try {
    const { categories, demos } = await loadCatalogData();
    if (!categories || !demos) {
      container.innerHTML = `<p style="color:var(--muted);text-align:center;padding:2rem;">Erro ao carregar dados.</p>`;
      return;
    }

    const category = getCategoryById(categories, categoryId);
    if (!category) {
      container.innerHTML = `<p style="color:var(--muted);text-align:center;padding:2rem;">Categoria não encontrada.</p>`;
      return;
    }

    const catDemos = getDemosByCategory(demos, categoryId);
    if (catDemos.length === 0) {
      container.innerHTML = `<p style="color:var(--muted);text-align:center;padding:2rem;">Nenhuma demonstração disponível para esta categoria.</p>`;
      return;
    }

    container.innerHTML = catDemos.map(demo => `
      <div class="demo-card-item">
        <span class="demo-icon">📱</span>
        <h3>${demo.title}</h3>
        <p>${demo.description}</p>
        <a href="${PATH.resolveLink(demo.url)}?cat=${categoryId}" class="btn btn-outline">Ver demo</a>
      </div>
    `).join('');

    const titleEl = document.querySelector('.category-header h1');
    if (titleEl) titleEl.textContent = `${category.name}`;
    const descEl = document.querySelector('.category-header p');
    if (descEl) descEl.textContent = `${catDemos.length} demonstração${catDemos.length !== 1 ? 'ões' : ''} disponíve${catDemos.length !== 1 ? 'is' : 'l'}`;

  } catch (error) {
    console.error('[Catalog] Erro ao renderizar demos:', error);
    container.innerHTML = `<p style="color:var(--muted);text-align:center;padding:2rem;">Erro ao carregar demonstrações. Tente novamente.</p>`;
  }
}