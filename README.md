<img src="assets/icons/logo-polimata.svg" alt="Polímata" width="32" height="32" /> POLÍMATA — Plataforma de Inteligência Digital
Transformamos ideias, conhecimentos e serviços em experiências digitais inteligentes.
https://img.shields.io/badge/version-1.0.0-blue?style=flat-square
https://img.shields.io/badge/status-production-brightgreen?style=flat-square
https://img.shields.io/badge/PWA-ready-5A0FC8?style=flat-square
https://img.shields.io/badge/responsive-mobile--first-00C7B7?style=flat-square
https://img.shields.io/badge/vanilla-js-F7DF1E?style=flat-square
https://img.shields.io/badge/html5-E34F26?style=flat-square
https://img.shields.io/badge/css3-1572B6?style=flat-square
https://img.shields.io/badge/license-MIT-green?style=flat-square
https://img.shields.io/badge/hosted%2520on-GitHub%2520Pages-181717?style=flat-square
https://img.shields.io/badge/theme-engine-FF6B6B?style=flat-square
https://img.shields.io/badge/SPM-Showcase%2520Mode-FFC857?style=flat-square
https://img.shields.io/badge/PTF-Pol%C3%ADmata%2520Theme%2520Foundation-8A2BE2?style=flat-square
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 Índice
⚡ Sobre o Projeto
🚀 Principais Recursos
🛠️ Tecnologias
🏗️ Arquitetura
📂 Estrutura do Projeto
⚙️ Instalação e Desenvolvimento
📱 PWA
🎨 Polímata Theme Foundation (PTF)
🎬 Showcase Presentation Mode (SPM)
🧩 Componentes
🗺️ Roadmap
❓ FAQ
🤝 Contribuição
📄 Licença
👏 Créditos
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ Sobre o Projeto
Polímata Studio é uma plataforma institucional e um ecossistema digital que reúne:
Portal institucional com páginas de Soluções, Produções, Sobre e Contato.
Catálogo inteligente de demonstrações organizado por segmentos (Igrejas, Escolas, Clínicas, Salões, Barbearias, Academias, Comércio, Produtos Digitais, etc.).
Showcase Presentation Mode (SPM) — visualização em tela cheia com navegação entre demos.
Polímata Theme Foundation (PTF) — sistema de temas dinâmicos com suporte a agendamento sazonal.
PWA (Progressive Web App) — instalável, com Service Worker e cache offline.
Totalmente estático — zero dependências de backend, pronto para qualquer host.
O projeto foi desenvolvido para operar em GitHub Pages, Netlify, Vercel, Hostinger, Apache, Nginx e Live Server, com resolução de caminhos adaptativa via PathResolver e window.PROJECT_BASE.
📌 URL oficial: https://polimatastudio.github.io/pscomercial/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Principais Recursos
Recurso	Descrição
🏠 Portal Institucional	Home, Soluções, Produções, Sobre, Contato — com carregamento dinâmico de componentes
📂 Catálogo de Demonstrações	Living Stack™ com categorias e pré-visualização de demos por segmento
🎬 SPM	Modo apresentação em tela cheia com navegação, contador e atalhos por teclado
🎨 PTF	Sistema de temas com registry, fallback e agendamento sazonal (Natal, Carnaval, etc.)
📱 PWA	Manifesto, Service Worker, instalação e cache offline
🧩 Componentes Modulares	Navbar, Footer, Cards, Hero, Forms, etc. — carregados dinamicamente via JSON
📦 Dados em JSON	Todo conteúdo editável (soluções, produções, demos, categorias) em arquivos JSON
🌐 Path Resolution	Resolução de caminhos adaptativa com window.PROJECT_BASE para qualquer host
♿ Acessibilidade	WCAG 2.2 AA, foco visível, navegação por teclado, ARIA
🔍 SEO Nativo	Meta tags, Open Graph, Twitter Cards, Schema.org, sitemap, robots.txt
⚡ Performance	Lazy loading, SVG icons, CSS tokens, JS modular, carregamento assíncrono
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛠️ Tecnologias
Camada	Tecnologia
Front-end	HTML5, CSS3, JavaScript (ES2024)
Arquitetura CSS	CUBE CSS + Design Tokens
Gerenciamento de Dados	JSON (estático)
PWA	Service Worker + Manifest
Temas	PTF — Polímata Theme Foundation
SPM	Showcase Presentation Mode Engine
Build	Nenhuma — Vanilla JS + HTML direto
Hospedagem	GitHub Pages (ou qualquer host estático)
Versionamento	Git + GitHub
🔹 Badges Técnicos
Badge	Descrição
https://img.shields.io/badge/static-site-0A0A0A?style=flat-square	100% estático
https://img.shields.io/badge/mobile-first-00C7B7?style=flat-square	Design mobile-first
https://img.shields.io/badge/dark-mode-1A1A2E?style=flat-square	Tema escuro premium
https://img.shields.io/badge/modular-architecture-FF6B6B?style=flat-square	Arquitetura modular
https://img.shields.io/badge/offline-ready-FFC857?style=flat-square	Offline-first
https://img.shields.io/badge/no-dependencies-8A2BE2?style=flat-square	Zero dependências
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏗️ Arquitetura
A plataforma segue uma arquitetura modular, data-driven e PWA-first, com separação clara entre apresentação, dados e lógica.
text
┌─────────────────────────────────────────────────────────────┐
│                     POLÍMATA PLATFORM                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │   Portal   │  │    PWA     │  │        SPM           │  │
│  │  (Site)    │  │ (Instalável)│  │ (Showcase Mode)      │  │
│  └────────────┘  └────────────┘  └──────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Polímata Theme Foundation              │   │
│  │     (Temas dinâmicos + Registry + Scheduler)        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Component Library                       │   │
│  │   Navbar • Footer • Cards • Hero • Forms • CTA     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Data Layer (JSON)                       │   │
│  │  solutions.json • productions.json • demos.json     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Path Resolver Engine                    │   │
│  │     (window.PROJECT_BASE + resolve())               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
🔹 Fluxo de Dados
Páginas HTML carregam paths.js e app.js.
PathResolver define a base do projeto (window.PROJECT_BASE).
app.js inicializa módulos:
loadComponents() → carrega Navbar e Footer via fetch.
renderSolutions(), renderProductions() etc. → buscam dados em data/ via fetch.
SPM carrega demos.json e gerencia navegação.
ThemeLoader carrega registry.json e aplica o tema ativo.
Tudo é estático — os dados são consumidos no client-side.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📂 Estrutura do Projeto
text
/pscomercial/
├── index.html                         # Página inicial
├── manifest.json                      # Manifesto PWA
├── service-worker.js                  # Service Worker
├── pages/
│   ├── solucoes.html
│   ├── producoes.html
│   ├── sobre.html
│   └── contato.html
├── demos/
│   ├── index.html                     # Catálogo de demos
│   ├── category.html                  # Página de categoria
│   └── academy-core/                  # Exemplo de demo
│       ├── index.html
│       └── demo.html
├── components/
│   ├── navbar.html
│   ├── footer.html
│   ├── hero.html
│   ├── card-solution.html
│   ├── card-production.html
│   ├── card-project.html
│   ├── cta.html
│   ├── section-title.html
│   └── form-contact.html
├── css/
│   ├── tokens.css                     # Design tokens (cores, espaços, etc.)
│   ├── base.css                       # Reset e estilos base
│   ├── layout.css                     # Grid e containers
│   ├── components.css                 # Estilos de componentes
│   └── pages.css                      # Estilos específicos de páginas
├── js/
│   ├── app.js                         # Inicialização global
│   ├── components.js                  # Carregamento de componentes
│   ├── router.js                      # Navegação
│   ├── forms.js                       # Validação de formulários
│   ├── pwa.js                         # Registro do Service Worker
│   ├── analytics.js                   # Eventos de tracking
│   ├── search.js                      # Busca (futuro)
│   ├── core/
│   │   ├── paths.js                   # Resolução de caminhos
│   │   ├── init.js                    # Inicialização base
│   │   ├── data-loader.js             # Fetch de JSON
│   │   └── loader.js                  # Carregamento de componentes
│   ├── theme/
│   │   ├── theme-loader.js            # Carregador de temas
│   │   ├── theme-registry.js          # Registry dos temas
│   │   ├── theme-scheduler.js         # Agendamento sazonal
│   │   ├── theme-validator.js         # Validação de temas
│   │   ├── theme-snapshot.js          # Snapshots de estilo
│   │   └── regression-shield.js       # Testes de regressão
│   ├── catalog.js                     # Catálogo de demonstrações
│   └── spm.js                         # Showcase Presentation Mode
├── data/
│   ├── site.json
│   ├── solutions.json
│   ├── productions.json
│   ├── projects.json
│   ├── testimonials.json
│   ├── contact.json
│   ├── menu.json
│   ├── categories.json
│   └── demos.json
├── themes/
│   ├── registry.json                  # Registro de temas disponíveis
│   └── default/
│       ├── manifest.json
│       └── theme.css
└── assets/
├── icons/                         # Ícones SVG (todos)
├── images/
└── fonts/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ Instalação e Desenvolvimento
🔹 Pré‑requisitos
Navegador moderno (Chrome, Edge, Firefox, Safari)
Editor de código (VS Code recomendado)
(Opcional) Servidor local como Live Server
🔹 Clonagem e Configuração
bash
git clone https://github.com/polimatastudio/pscomercial.git
cd pscomercial
🔹 Configuração da Base (Importante)
Para que o projeto funcione corretamente em subdiretórios (ex: /pscomercial/), defina a variável window.PROJECT_BASE em todas as páginas HTML:
html
<script>
  window.PROJECT_BASE = '/pscomercial/'; // ou '/' para raiz
⚠️ Importante: Coloque este script antes do carregamento de paths.js.
🔹 Execução Local
Opção 1 — Live Server (VS Code)
Instale a extensão Live Server.
Clique com o botão direito em index.html → "Open with Live Server".
O projeto estará disponível em http://127.0.0.1:5500/.
Opção 2 — Qualquer servidor HTTP estático
bash
npx serve .          # ou
python -m http.server
🔹 Deploy
GitHub Pages
Ajuste window.PROJECT_BASE para '/pscomercial/' (ou o nome do seu repositório).
Faça push para o repositório.
Ative o GitHub Pages nas configurações do repositório (branch main, pasta /).
Acesse: https://<seu-usuario>.github.io/pscomercial/
Netlify / Vercel / Hostinger
Faça o upload dos arquivos ou conecte o repositório.
Defina window.PROJECT_BASE = '/' (se for raiz) ou o subdiretório correspondente.
Publique.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 PWA
A plataforma é uma Progressive Web App pronta para instalação.
Recurso	Implementação
Manifesto	manifest.json na raiz, com ícones, start_url: "./", display: standalone
Service Worker	Registrado via js/pwa.js com escopo na raiz (/pscomercial/)
Cache Offline	Recursos estáticos (HTML, CSS, JS, JSON) cacheados no Service Worker
Instalação	O navegador oferece instalação na tela inicial
Atualizações	O Service Worker atualiza o cache em segundo plano
Push Notifications	Preparado para futura integração
🔍 Teste: Abra o DevTools → Application → Manifest / Service Workers para validar.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 Polímata Theme Foundation (PTF)
O PTF é o sistema de temas dinâmicos da plataforma. Ele permite trocar a identidade visual da marca de forma programática, com suporte a agendamento sazonal.
🔹 Como Funciona
Registry (themes/registry.json) lista todos os temas disponíveis e define o ativo.
Cada tema possui uma pasta com manifest.json e theme.css.
O ThemeLoader carrega o CSS do tema ativo e aplica a classe theme-<id> ao <body>.
O ThemeScheduler permite trocar automaticamente por mês (ex: Natal, Carnaval, Black Friday).
🔹 Estrutura de um Tema
text
themes/
├── registry.json
├── default/
│   ├── manifest.json
│   └── theme.css
├── natal/
│   ├── manifest.json
│   └── theme.css
└── ...
🔹 Tema Default
O tema padrão é Neon Minimal Dark Intelligence, com paleta:
Token	Valor
--bg	#070A0F
--accent-lime	#B6FF3B
--accent-pink	#FF3BD4
--accent-blue	#3B7BFF
🔹 Agendamento Sazonal
No theme-scheduler.js, você pode mapear meses para temas:
js
const THEME_SCHEDULE = {
0: 'reveillon-infinity',   // Janeiro
1: 'carnaval-royale',      // Fevereiro
2: 'equinocio',            // Março
// ...
11: 'natal',               // Dezembro
};
🔹 Fallback
Se um tema não existir, o ThemeLoader carrega automaticamente o default.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 Showcase Presentation Mode (SPM)
O SPM é um engine de apresentação que transforma a visualização de demonstrações em uma experiência imersiva em tela cheia.
🔹 Funcionalidades
Expandir qualquer demo para tela cheia com um clique.
Navegação entre demos com botões Anterior/Próximo ou teclado (← →).
Contador e indicadores (dots) mostram a posição atual.
Atalhos:
ESC → Sair do modo apresentação
← / → → Navegar entre demos
F → Entrar/sair do modo apresentação
Fallback inteligente: se a URL de uma demo não existir, o SPM tenta demo.html e, se falhar, carrega um fallback.
🔹 Como Usar
Na página de uma demo (ex: demos/academy-core/index.html), clique em "Expandir".
A demo será exibida em tela cheia com os controles na parte inferior.
Navegue pelas demos disponíveis na mesma categoria (se houver).
Pressione ESC ou clique em "Sair" para voltar.
🔹 Integração com Catálogo
O SPM é alimentado pelo demos.json e suporta filtragem por categoria (via ?cat=igrejas na URL).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧩 Componentes
A plataforma utiliza uma biblioteca de componentes reutilizáveis carregados dinamicamente via loadComponent().
Componente	Arquivo	Função
Navbar	navbar.html	Menu principal com CTA
Footer	footer.html	Rodapé institucional
Hero	hero.html	Bloco de apresentação principal
Card Solução	card-solution.html	Exibição de soluções por segmento
Card Produção	card-production.html	Exibição de produções (apps, livros)
Card Projeto	card-project.html	Exibição de estudos de caso
CTA	cta.html	Chamada para ação
Section Title	section-title.html	Título e subtítulo de seção
Form Contato	form-contact.html	Formulário de contato
🔹 Renderização Dinâmica
Os cards são populados a partir de dados em JSON via funções como:
renderSolutions('#solutions-grid')
renderProductions('#productions-grid')
renderProjects('#projects-grid')
Isso permite atualizar o conteúdo sem modificar o HTML.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗺️ Roadmap
Sprint 1 — Core Platform
Portal (Home, Soluções, Produções, Sobre, Contato), PWA base, Theme Foundation, SPM.
Sprint 2 — Catálogo e Demonstrações
Catálogo inteligente com Living Stack™, filtros por segmento, demos interativas.
Auditoria e Correções
Path Resolution, compatibilidade GitHub Pages, validação completa.
Sprint 3 — Laboratório e Conteúdo
Artigos, experimentos, IA, protótipos, bastidores.
Sprint 4 — Área do Cliente
Dashboard, projetos, mensagens, arquivos, suporte.
Sprint 5 — Marketplace e Produtos
Templates, plugins, SaaS, integrações.
Sprint 6 — Internacionalização
Suporte multilíngue (EN, ES).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❓ FAQ
<details> <summary><strong>O projeto requer um backend?</strong></summary>
Não. Todo o conteúdo é estático (HTML, CSS, JS, JSON) e consome dados via fetch() no client-side. Formulários utilizam serviços externos como Static Forms.
</details><details> <summary><strong>Como alterar o conteúdo (soluções, produções)?</strong></summary>
Edite os arquivos JSON em /data/ correspondentes (ex: solutions.json, productions.json). As páginas são renderizadas dinamicamente a partir desses dados.
</details><details> <summary><strong>Como adicionar um novo tema?</strong></summary>
Crie uma pasta em /themes/ com o nome do tema (ex: meu-tema/).
Dentro dela, coloque manifest.json e theme.css.
Adicione a entrada no themes/registry.json.
Para ativação automática, adicione o mês correspondente no theme-scheduler.js.
</details><details> <summary><strong>Como adicionar uma nova demo?</strong></summary>
Crie uma nova pasta em /demos/ (ex: minha-demo/).
Coloque index.html e demo.html (opcional).
Adicione a demo ao data/demos.json com id, title, url e categoryId.
Se quiser que a demo apareça em uma categoria, certifique-se que a categoria existe em categories.json.
</details><details> <summary><strong>O SPM funciona offline?</strong></summary>
Sim, se o Service Worker estiver ativo e os recursos estiverem cacheados. O SPM carrega as demos via iframe e o SW pode servir o conteúdo offline.
</details><details> <summary><strong>Como ajustar a base para GitHub Pages com subdiretório?</strong></summary>
Defina window.PROJECT_BASE = '/nome-do-repositorio/' em todas as páginas HTML. O PathResolver usará essa base para resolver todos os caminhos.
</details>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤝 Contribuição
Contribuições são bem-vindas! Siga estas diretrizes:
Fork o repositório.
Crie uma branch para sua feature: git checkout -b feature/nova-feature.
Commit suas alterações: git commit -m 'Adiciona nova feature'.
Push para a branch: git push origin feature/nova-feature.
Abra um Pull Request.
🔹 Diretrizes de Código
Mantenha a arquitetura existente (modular, data-driven, vanilla JS).
Utilize os design tokens em vez de valores fixos.
Certifique-se de que todos os caminhos sejam resolvidos via PathResolver.
Atualize a documentação se necessário.
Teste em múltiplos dispositivos e navegadores.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 Licença
Este projeto está licenciado sob a licença MIT — veja o arquivo LICENSE para detalhes.
text
MIT License
Copyright (c) 2026 Polímata Studio
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👏 Créditos
Desenvolvido com ❤️ pela equipe da Polímata Studio.
Arquitetura e Desenvolvimento: Polímata Studio
Design System: Polímata Theme Foundation (PTF)
SPM Engine: Showcase Presentation Mode
Path Resolution: PathResolver Engine
Agradecimentos especiais às comunidades de código aberto e aos mantenedores das tecnologias utilizadas.
Polímata Studio — Inteligência Digital Multidisciplinar
https://img.shields.io/badge/GitHub-polimatastudio-181717?style=flat-square&logo=github
https://img.shields.io/badge/Instagram-@polimata-E4405F?style=flat-square&logo=instagram
https://img.shields.io/badge/YouTube-@Pol%C3%ADmata--std-FF0000?style=flat-square&logo=youtube
https://img.shields.io/badge/TikTok-@polimata-000000?style=flat-square&logo=tiktok
Versão do README: 1.1.0
Última atualização: 12 de julho de 2026
