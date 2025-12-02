// app.js — простой клиентский auth (фейковый JWT)
const app = document.getElementById('app');

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  token ? renderDashboard() : renderLoginForm();
});

function renderLoginForm(){
  app.innerHTML = `
    <h2>ANTISOCIAL LOGIN</h2>
    <input id="email" type="email" placeholder="E-mail" autocomplete="username" />
    <input id="password" type="password" placeholder="Пароль" autocomplete="current-password" />
    <button id="loginBtn">Войти</button>
  `;

  document.getElementById('loginBtn').addEventListener('click', login);
}

function login(){
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();

  if(!email || !pass){
    alert('Заполни оба поля, брат.');
    return;
  }

  const fakeJWT = generateFakeJWT({ email, iat: Date.now() });
  localStorage.setItem('token', fakeJWT);
  renderDashboard();
}

function renderDashboard(){
  const token = localStorage.getItem('token') || '';
  let payload = { email: 'unknown' };

  try {
    const parts = token.split('.');
    if(parts.length >= 2) payload = JSON.parse(atob(parts[1]));
  } catch(e) { /* noop */ }

  app.innerHTML = `
    <h2>WELCOME, OUTCAST</h2>
    <p style="text-align:center; margin:6px 0 14px 0;">E-mail: <b>${payload.email}</b></p>
    <p>Токен (localStorage):</p>
    <textarea rows="5" readonly>${token}</textarea>
    <button id="logoutBtn">Выйти</button>
  `;

  document.getElementById('logoutBtn').addEventListener('click', logout);
}

function logout(){
  localStorage.removeItem('token');
  renderLoginForm();
}

function generateFakeJWT(payload){
  const header = { alg: "HS256", typ: "JWT" };
  const encode = obj => btoa(JSON.stringify(obj));
  return `${encode(header)}.${encode(payload)}.sig123`;
}