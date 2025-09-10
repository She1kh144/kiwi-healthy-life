// script.js — интерактивность: nav toggle, theme, рендер статей, валидация формы

/* — NAV TOGGLE — */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

// Закрывать меню при клике на ссылку (на мобильных)
navMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* — THEME TOGGLE — */
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // по умолчанию — системные настройки
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* — ДИНАМИЧЕСКИЕ СТАТЬИ — (пример массива, можно загружать с API) */
const articlesData = [
  {
    title: '5 простых правил питания',
    excerpt: 'Как составить простой план питания и не терять удовольствие от еды.',
    img: 'https://picsum.photos/seed/p1/600/350'
  },
  {
    title: 'Тренировки для занятых людей',
    excerpt: 'Короткие, но эффективные комплексы, которые можно делать дома.',
    img: 'https://picsum.photos/seed/p2/600/350'
  },
  {
    title: 'Как улучшить сон',
    excerpt: 'Рутина на вечер: что убрать, что добавить, чтобы засыпать легче.',
    img: 'https://picsum.photos/seed/p3/600/350'
  }
];

function renderArticles() {
  const container = document.getElementById('articles-list');
  container.innerHTML = ''; // очистка
  articlesData.forEach(a => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${a.img}" alt="${a.title}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:0.6rem;">
      <h3>${a.title}</h3>
      <p style="color:var(--muted)">${a.excerpt}</p>
      <p><button class="btn read-btn">Читать</button></p>
    `;
    container.appendChild(card);

    // sample "читать" — показывает alert (можно заменить модальным окном)
    card.querySelector('.read-btn').addEventListener('click', () => {
      alert(a.title + "\n\n" + a.excerpt + "\n\n(Здесь вы можете открыть полную статью.)");
    });
  });
}
renderArticles();

/* — ФОРМА — простая валидация и демонстрация — */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // простая валидация
  if (!name || !email || !message) {
    status.textContent = 'Пожалуйста, заполните все поля.';
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    status.textContent = 'Пожалуйста, укажите корректный email.';
    return;
  }

  // демонстрация: сохраняем в localStorage (в реальном проекте – отправлять на сервер)
  const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
  submissions.push({ name, email, message, date: new Date().toISOString() });
  localStorage.setItem('submissions', JSON.stringify(submissions));

  status.textContent = 'Спасибо! Ваше сообщение сохранено локально (пример).';
  form.reset();
});

/* — footer year */
document.getElementById('year').textContent = new Date().getFullYear();
