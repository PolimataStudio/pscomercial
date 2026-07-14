import { loadComponent } from './core/loader.js';
import { loadSolutions, loadProductions, loadProjects } from './core/data-loader.js';

const resolver = window.PathResolver;

export async function loadComponents() {
  await loadComponent('navbar-placeholder', 'navbar');
  await loadComponent('footer-placeholder', 'footer');
}

export async function renderSolutions(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  try {
    const solutions = await loadSolutions();
    if (!solutions || !solutions.length) {
      container.innerHTML = `<p style="color:var(--muted);text-align:center;">Nenhuma solução disponível.</p>`;
      return;
    }
    container.innerHTML = solutions.map(sol => `
      <div class="card solution-card" data-category="${sol.category}">
        <div class="card-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <use href="${resolver.resolveAsset(`assets/icons/${sol.icon}.svg`)}#icon" />
          </svg>
        </div>
        <span class="badge">${sol.category}</span>
        <h3>${sol.title}</h3>
        <p>${sol.summary}</p>
        <a href="${resolver.resolveLink('pages/contato.html')}" class="btn btn-outline card-cta">${sol.cta}</a>
      </div>
    `).join('');
  } catch (e) {
    console.error('[renderSolutions] Erro:', e);
    container.innerHTML = `<p style="color:var(--muted);text-align:center;">Erro ao carregar soluções.</p>`;
  }
}

export async function renderProductions(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  try {
    const productions = await loadProductions();
    if (!productions || !productions.length) {
      container.innerHTML = `<p style="color:var(--muted);text-align:center;">Nenhuma produção disponível.</p>`;
      return;
    }
    container.innerHTML = productions.map(prod => `
      <div class="card production-card">
        <span class="production-type">${prod.type}</span>
        <h3>${prod.title}</h3>
        <p>${prod.summary}</p>
        <span class="text-muted">${prod.format} • ${prod.year}</span>
        <a href="${resolver.resolveLink('pages/contato.html')}" class="btn btn-secondary card-cta">${prod.cta}</a>
      </div>
    `).join('');
  } catch (e) {
    console.error('[renderProductions] Erro:', e);
    container.innerHTML = `<p style="color:var(--muted);text-align:center;">Erro ao carregar produções.</p>`;
  }
}

export async function renderProjects(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  try {
    const projects = await loadProjects();
    if (!projects || !projects.length) {
      container.innerHTML = `<p style="color:var(--muted);text-align:center;">Nenhum projeto disponível.</p>`;
      return;
    }
    container.innerHTML = projects.map(proj => `
      <div class="card project-card">
        <span class="badge">${proj.segment}</span>
        <h3>${proj.title}</h3>
        <p><strong>Resultado:</strong> ${proj.result}</p>
        <p class="text-muted">${proj.proof}</p>
        <a href="${resolver.resolveLink('pages/contato.html')}" class="btn btn-outline card-cta">${proj.cta}</a>
      </div>
    `).join('');
  } catch (e) {
    console.error('[renderProjects] Erro:', e);
    container.innerHTML = `<p style="color:var(--muted);text-align:center;">Erro ao carregar projetos.</p>`;
  }
}