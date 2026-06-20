import { loadComponents } from '/js/components.js';

document.addEventListener('DOMContentLoaded', () => {
  loadComponents();

  const data = {
    schedule: [
      { day: 'Domingo', time: '09:00', event: 'Culto Matutino' },
      { day: 'Domingo', time: '19:00', event: 'Culto Noturno' },
      { day: 'Terça', time: '20:00', event: 'Estudo Bíblico' },
      { day: 'Quinta', time: '19:30', event: 'Reunião de Oração' }
    ],
    events: [
      { title: 'Retiro Espiritual', date: '15/07/2026', description: 'Um fim de semana de renovação.', image: '' },
      { title: 'Culto de Jovens', date: '22/07/2026', description: 'Noite de louvor e adoração.', image: '' }
    ],
    prayerRequests: [
      { name: 'Maria', request: 'Orem pela saúde da minha mãe.' },
      { name: 'João', request: 'Orem pela minha família.' }
    ],
    bibleStudies: [
      { title: 'O Poder da Oração', verse: 'Mateus 6:6', summary: 'A importância da oração secreta.' },
      { title: 'Vida em Comunidade', verse: 'Atos 2:42-47', summary: 'A igreja primitiva como modelo.' }
    ],
    contact: {
      address: 'Rua das Flores, 123, Centro, Cidade',
      phone: '(11) 99999-9999',
      email: 'contato@igrejaviva.com'
    },
    social: {
      instagram: 'https://instagram.com/igrejaviva',
      youtube: 'https://youtube.com/@igrejaviva'
    }
  };

  // Renderizar Agenda
  const scheduleList = document.getElementById('schedule-list');
  if (scheduleList) {
    scheduleList.innerHTML = data.schedule.map(item =>
      `<div class="demo-schedule-item">
        <div class="day">${item.day}</div>
        <div class="time">${item.time}</div>
        <div class="event">${item.event}</div>
      </div>`
    ).join('');
  }

  // Renderizar Eventos
  const eventsList = document.getElementById('events-list');
  if (eventsList) {
    eventsList.innerHTML = data.events.map(item =>
      `<div class="card">
        <h3>${item.title}</h3>
        <p><strong>${item.date}</strong></p>
        <p>${item.description}</p>
        <a href="#" class="btn btn-secondary">Participar</a>
      </div>`
    ).join('');
  }

  // Renderizar Pedidos de Oração
  const prayerList = document.getElementById('prayer-list');
  if (prayerList) {
    prayerList.innerHTML = data.prayerRequests.map(item =>
      `<div class="demo-list-item">
        <strong>${item.name}</strong>
        <p>${item.request}</p>
      </div>`
    ).join('');
  }

  // Renderizar Estudos Bíblicos
  const bibleList = document.getElementById('bible-list');
  if (bibleList) {
    bibleList.innerHTML = data.bibleStudies.map(item =>
      `<div class="demo-list-item">
        <strong>${item.title}</strong>
        <p>${item.verse}</p>
        <p>${item.summary}</p>
      </div>`
    ).join('');
  }

  // Renderizar Contatos
  const contactInfo = document.getElementById('contact-info');
  if (contactInfo) {
    contactInfo.innerHTML = `
      <p><strong>Endereço:</strong> ${data.contact.address}</p>
      <p><strong>Telefone:</strong> ${data.contact.phone}</p>
      <p><strong>Email:</strong> ${data.contact.email}</p>
    `;
  }

  // Renderizar Redes Sociais
  const socialLinks = document.getElementById('social-links');
  if (socialLinks) {
    socialLinks.innerHTML = Object.entries(data.social).map(([key, url]) =>
      `<a href="${url}" target="_blank" rel="noopener">
        <svg width="24" height="24"><use href="/assets/icons/${key}.svg#icon"/></svg>
        ${key.charAt(0).toUpperCase() + key.slice(1)}
      </a>`
    ).join('');
  }

  // Formulário de Pedido de Oração
  const prayerForm = document.getElementById('prayer-form');
  if (prayerForm) {
    prayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('prayer-name').value.trim();
      const request = document.getElementById('prayer-request').value.trim();
      if (!name || !request) {
        alert('Preencha todos os campos.');
        return;
      }
      // Simula envio
      alert('Pedido enviado! Obrigado por compartilhar.');
      prayerForm.reset();
      // Adiciona à lista (simulação)
      const newItem = document.createElement('div');
      newItem.className = 'demo-list-item';
      newItem.innerHTML = `<strong>${name}</strong><p>${request}</p>`;
      prayerList.prepend(newItem);
    });
  }

  // Botão de Contribuição
  const contributeBtn = document.getElementById('contribute-btn');
  if (contributeBtn) {
    contributeBtn.addEventListener('click', () => {
      alert('Simulação de contribuição. Em breve integração real.');
    });
  }

  // Menu mobile
  const toggle = document.querySelector('.demo-navbar-toggle');
  const links = document.querySelector('.demo-navbar-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  console.log('IgrejaPolímata demo carregada.');
});