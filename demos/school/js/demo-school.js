import { loadComponents } from '/js/components.js';

document.addEventListener('DOMContentLoaded', () => {
  loadComponents();

  const data = {
    calendar: [
      { month: 'Julho 2026', events: [
        { date: '10/07/2026', title: 'Prova de Matemática' },
        { date: '15/07/2026', title: 'Reunião de Pais' },
        { date: '20/07/2026', title: 'Feriado: Dia do Amigo' }
      ]}
    ],
    communications: [
      { date: '01/07/2026', title: 'Início do semestre', content: 'Atenção pais, início das aulas.' },
      { date: '05/07/2026', title: 'Feira Cultural', content: 'Participe da nossa feira cultural.' }
    ],
    projects: [
      { title: 'Projeto Sustentabilidade', description: 'Alunos aprendem sobre reciclagem.', status: 'Em andamento' },
      { title: 'Clube de Leitura', description: 'Incentivo à leitura literária.', status: 'Finalizado' }
    ],
    library: [
      { title: 'Dom Casmurro', author: 'Machado de Assis' },
      { title: 'O Pequeno Príncipe', author: 'Saint-Exupéry' }
    ],
    gallery: [
      { title: 'Aula de Ciências', image: '' },
      { title: 'Festival de Dança', image: '' }
    ],
    contact: {
      address: 'Av. Educação, 456, Bairro, Cidade',
      phone: '(11) 88888-8888',
      email: 'contato@escolahorizonte.com'
    }
  };

  // Calendário
  const calendarList = document.getElementById('calendar-list');
  if (calendarList) {
    calendarList.innerHTML = data.calendar.map(monthData =>
      `<div class="demo-calendar-month">
        <h3>${monthData.month}</h3>
        <ul>
          ${monthData.events.map(ev =>
            `<li><span>${ev.date}</span><span>${ev.title}</span></li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');
  }

  // Comunicados
  const commList = document.getElementById('communications-list');
  if (commList) {
    commList.innerHTML = data.communications.map(item =>
      `<div class="demo-list-item">
        <div class="date">${item.date}</div>
        <div class="title">${item.title}</div>
        <div class="content">${item.content}</div>
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
        <span class="badge">${item.status}</span>
      </div>`
    ).join('');
  }

  // Biblioteca
  const libraryList = document.getElementById('library-list');
  if (libraryList) {
    libraryList.innerHTML = data.library.map(item =>
      `<div class="card">
        <h3>${item.title}</h3>
        <p>${item.author}</p>
        <a href="#" class="btn btn-secondary">Detalhes</a>
      </div>`
    ).join('');
  }

  // Galeria
  const galleryList = document.getElementById('gallery-list');
  if (galleryList) {
    galleryList.innerHTML = data.gallery.map(item =>
      `<div class="card">
        <div class="card-icon" style="background:var(--surface-light);height:150px;display:flex;align-items:center;justify-content:center;color:var(--muted);">📸</div>
        <h3>${item.title}</h3>
      </div>`
    ).join('');
  }

  // Contato
  const contactInfo = document.getElementById('contact-info');
  if (contactInfo) {
    contactInfo.innerHTML = `
      <p><strong>Endereço:</strong> ${data.contact.address}</p>
      <p><strong>Telefone:</strong> ${data.contact.phone}</p>
      <p><strong>Email:</strong> ${data.contact.email}</p>
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

  console.log('EscolaPolímata demo carregada.');
});