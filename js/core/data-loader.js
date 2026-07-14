const resolver = window.PathResolver;

export async function loadJSON(fileName) {
  if (resolver && typeof resolver.resolveData === 'function') {
    const url = resolver.resolveData(fileName);
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
    } catch (e) { /* fallback */ }
  }
  const base = window.PROJECT_BASE || '/';
  for (const path of [base + 'data/' + fileName, 'data/' + fileName, '/data/' + fileName]) {
    try {
      const response = await fetch(path);
      if (response.ok) return await response.json();
    } catch (e) { /* continue */ }
  }
  console.error(`[DataLoader] Não foi possível carregar ${fileName}.`);
  return null;
}

export async function loadSolutions() { return loadJSON('solutions.json'); }
export async function loadProductions() { return loadJSON('productions.json'); }
export async function loadProjects() { return loadJSON('projects.json'); }
export async function loadTestimonials() { return loadJSON('testimonials.json'); }
export async function loadDemos() { return loadJSON('demos.json'); }
export async function loadMenu() { return loadJSON('menu.json'); }