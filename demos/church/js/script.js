// Interações leves para a demo (ex: scroll suave, contador, etc.)
document.addEventListener('DOMContentLoaded', () => {
  // Exemplo: contador de eventos (apenas para demonstrar interatividade)
  const eventItems = document.querySelectorAll('.demo-event-item');
  if (eventItems.length) {
    console.log(`[Igreja Demo] ${eventItems.length} eventos carregados.`);
  }

  // Scroll suave para links internos (se houver)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});