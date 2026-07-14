// js/psef/PSEFConfig.js
/**
 * PSEFConfig – Configurações globais da PSEF 4.0
 * Centraliza timers, thresholds, seletores e comportamentos.
 */
export const PSEFConfig = {
  // Tooltip
  tooltip: {
    duration: 5000,          // ms que a tooltip fica visível
    sessionKey: 'psef-tooltip-shown', // chave no sessionStorage
    message: 'Use as setas ou deslize para navegar entre as demonstrações',
  },

  // Swipe
  swipe: {
    threshold: 60,           // pixels mínimos para considerar swipe
  },

  // Animações
  animation: {
    fadeDuration: 300,       // ms para fade in/out
    scaleDuration: 400,      // ms para scale
  },

  // Viewport
  viewport: {
    maxWidth: 1200,          // largura máxima do iframe
    maxHeight: 0.9,          // proporção máxima da altura da viewport (0.9 = 90%)
  },

  // HUD
  hud: {
    buttonSize: 48,          // tamanho dos botões em px
    buttonGap: 16,           // distância das bordas
    zIndex: 10001,           // z-index da HUD
  },

  // Overlay
  overlay: {
    zIndex: 10000,           // z-index da PSEF Root Layer
    backdropColor: 'rgba(7, 10, 15, 0.85)',
    backdropBlur: '12px',
  },

  // Selectors (usados para identificar elementos na página)
  selectors: {
    expandBtn: '.spm-expand-btn',
    showcaseWrapper: '.demo-showcase-wrapper',
    showcase: '.demo-showcase',
    iframe: '.demo-showcase iframe',
  },
};