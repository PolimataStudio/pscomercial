export async function loadComponents() {
  // Usar caminhos relativos à base (já que o HTML tem base href definido)
  const components = [
    { id: 'navbar-placeholder', path: 'components/navbar.html' },
    { id: 'footer-placeholder', path: 'components/footer.html' }
  ];

  for (const comp of components) {
    const element = document.getElementById(comp.id);
    if (element) {
      try {
        const response = await fetch(comp.path);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const html = await response.text();
        element.innerHTML = html;
        // Dispara evento para scripts que dependem do carregamento
        document.dispatchEvent(new CustomEvent('componentLoaded', { detail: { id: comp.id } }));
      } catch (e) {
        console.warn(`Falha ao carregar componente: ${comp.path}`, e);
        element.innerHTML = '';
      }
    }
  }
}

export function renderSolutions(solutions, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = solutions.map(sol => `
    <div class="card solution-card" data-category="${sol.category}">
      <div class="card-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <use href="assets/icons/${sol.icon}.svg#icon" />
        </svg>
      </div>
      <span class="badge">${sol.category}</span>
      <h3>${sol.title}</h3>
      <p>${sol.summary}</p>
      <a href="pages/contato.html" class="btn btn-outline card-cta">${sol.cta}</a>
    </div>
  `).join('');
}

export function renderProductions(productions, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = productions.map(prod => `
    <div class="card production-card">
      <span class="production-type">${prod.type}</span>
      <h3>${prod.title}</h3>
      <p>${prod.summary}</p>
      <span class="text-muted">${prod.format} • ${prod.year}</span>
      <a href="pages/contato.html" class="btn btn-secondary card-cta">${prod.cta}</a>
    </div>
  `).join('');
}

export function renderProjects(projects, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = projects.map(proj => `
    <div class="card project-card">
      <span class="badge">${proj.segment}</span>
      <h3>${proj.title}</h3>
      <p><strong>Resultado:</strong> ${proj.result}</p>
      <p class="text-muted">${proj.proof}</p>
      <a href="pages/contato.html" class="btn btn-outline card-cta">${proj.cta}</a>
    </div>
  `).join('');
}