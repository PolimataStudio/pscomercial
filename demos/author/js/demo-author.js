import { loadComponents } from '/js/components.js';

document.addEventListener('DOMContentLoaded', () => {
  loadComponents();

  const data = {
    books: [
      { title: 'O Poder da Disciplina', synopsis: 'Como a disciplina transforma vidas.', link: '#' },
      { title: 'Mindset Digital', synopsis: 'Adapte-se à era digital.', link: '#' }
    ],
    events: [
      { title: 'Lançamento do livro "Resiliência"', date: '10/08/2026', location: 'Livraria Cultura' },
      { title: 'Palestra na Feira do Livro', date: '20/08/2026', location: 'Centro de Convenções' }
    ],
    gallery: [
      { title: 'Palestra em SP', image: '' },
      { title: 'Sessão de Autógrafos', image: '' }
    ],
    contact: {
      email: 'carlos@carlossilva.com',
      social: {
        instagram: 'https://instagram.com/carlossilva',
        youtube: 'https://youtube.com/@carlossilva'
      }
    }
  };

  // Livros
  const booksList = document.getElementById('books-list');
  if (booksList) {
    booksList.innerHTML = data.books.map(item =>
      `<div class="card">
        <h3>${item.title}</h3>
        <p>${item.synopsis}</p>
        <a href="${item.link}" class="btn btn-secondary">Comprar</a>
      </div>`
    ).join('');
  }

  // Eventos
  const eventsList = document.getElementById('events-list');
  if (eventsList) {
    eventsList.innerHTML = data.events.map(item =>
      `<div class="demo-list-item">
        <div class="date">${item.date}</div>
        <div class="title">${item.title}</div>
        <div class="location">${item.location}</div>
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
      <p><strong>Email:</strong> ${data.contact.email}</p>
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

  console.log('AutorPolímata demo carregada.');
});