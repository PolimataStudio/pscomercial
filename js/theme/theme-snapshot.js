// js/theme/theme-snapshot.js
let snapshots = {};

export function captureSnapshot(themeId) {
  // Simula a captura de propriedades visuais
  const snapshot = {
    themeId,
    timestamp: Date.now(),
    colors: {
      bg: getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(),
      text: getComputedStyle(document.documentElement).getPropertyValue('--text').trim(),
      muted: getComputedStyle(document.documentElement).getPropertyValue('--muted').trim(),
    },
    // Poderia capturar mais propriedades, mas para simplicidade, mantemos apenas cores principais
  };
  snapshots[themeId] = snapshot;
  console.log(`[ThemeSnapshot] Snapshot capturado para "${themeId}"`, snapshot);
  return snapshot;
}

export function compareSnapshots(themeId1, themeId2) {
  const s1 = snapshots[themeId1];
  const s2 = snapshots[themeId2];
  if (!s1 || !s2) {
    console.warn('[ThemeSnapshot] Um dos snapshots não existe.');
    return null;
  }
  const diff = {};
  for (const key in s1) {
    if (key === 'themeId' || key === 'timestamp') continue;
    if (s1[key] !== s2[key]) {
      diff[key] = { before: s1[key], after: s2[key] };
    }
  }
  const hasStructuralChange = Object.keys(diff).length > 0;
  if (hasStructuralChange) {
    console.warn('[ThemeSnapshot] Alterações estruturais detectadas:', diff);
  } else {
    console.log('[ThemeSnapshot] Nenhuma alteração estrutural detectada.');
  }
  return { diff, hasStructuralChange };
}