import { loadComponents } from '/js/components.js';

document.addEventListener('DOMContentLoaded', () => {
  loadComponents();

  const data = {
    services: [
      { title: 'UI Design', description: 'Interfaces visuais modernas e funcionais.' },
      { title: 'UX Design', description: 'Jornadas centradas no usuário.' },
      { title: 'Desenvolvimento Front-End', description: 'Código limpo e otimizado.' }
    ],
    projects: [
      { title: 'E-commerce de Moda', description: 'Plataforma completa com PWA.' },
      { title: 'App de Saúde', description: 'Aplicativo para acompanhamento médico.' }
    ],
    testimonials: [
      { author: 'Maria Oliveira', role: 'CEO, Moda Store', quote: 'João transformou nossa presença digital.' },
      { author: 'Dr. Pedro Santos', role: 'Médico', quote: 'App intuitivo e bem projetado.' }
    ],
    contact: {
      email: 'joao@joaodesigner.com',
      phone: '(11) 77777-7777',
      social: {
        linkedin: 'https://linkedin.com/',
        instagram: 'https://instagram.com/'
      }
    }
  };

  // Serviços
  const servicesList = document.getElementById('services-list');
  if (servicesList) {
    servicesList.innerHTML = data.services.map(item =>
      `<div class="card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>`
    ).join('');
  }

  // Projetos
  const projectsList = document.getElementById('projects-list');
  if (projectsList) {
    projectsList.innerHTML = data.projects.map(item =>
      `<div class="card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="#" class="btn btn-secondary">Ver projeto</a>
      </div>`
    ).join('');
  }

  // Depoimentos
  const testimonialsList = document.getElementById('testimonials-list');
  if (testimonialsList) {
    testimonialsList.innerHTML = data.testimonials.map(item =>
      `<div class="card">
        <p>"${item.quote}"</p>
        <p><strong>${item.author}</strong><br />${item.role}</p>
      </div>`
    ).join('');
  }

  // Contato
  const contactInfo = document.getElementById('contact-info');
  if (contactInfo) {
    contactInfo.innerHTML = `
      <p><strong>Email:</strong> ${data.contact.email}</p>
      <p><strong>Telefone:</strong> ${data.contact.phone}</p>
      <div class="demo-social-links">
        ${Object.entries(data.contact.social).map(([key, url]) =>
          `<a href="${url}" target="_blank" rel="noopener">${key.charAt(0).toUpperCase() + key.slice(1)}</a>`
        ).join('')}
      </div>
    `;
  }

  // Menu mobile
  const toggle = document.querySelector('.demo-navbar-toggle');
  const links = document.querySelector('.demo-navbar-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  console.log('PortfólioPRO demo carregada.');
});