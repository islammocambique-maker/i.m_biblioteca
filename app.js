// app.js
document.addEventListener('DOMContentLoaded', () => {
  mostrarTelaInicial();
});

// Função para mostrar tela inicial (login/registo)
function mostrarTelaInicial() {
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  const titulo = document.createElement('h2');
  titulo.textContent = 'Bem-vindo à Biblioteca Islam Moçambique';

  const btnRegistar = document.createElement('button');
  btnRegistar.textContent = 'Registar';
  btnRegistar.onclick = mostrarRegisto;

  const btnLogin = document.createElement('button');
  btnLogin.textContent = 'Entrar';
  btnLogin.onclick = mostrarLogin;

  main.appendChild(titulo);
  main.appendChild(btnRegistar);
  main.appendChild(btnLogin);
}

// Função para mostrar registo
function mostrarRegisto() {
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  const form = document.createElement('form');

  form.innerHTML = `
    <h3>Registo de Utilizador</h3>
    <input type="text" id="nome" placeholder="Nome" required />
    <input type="email" id="email" placeholder="Email" required />
    <input type="tel" id="contacto" placeholder="Contacto" required />
    <input type="password" id="pin" placeholder="PIN" required />
    <button type="submit">Registar</button>
  `;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const contacto = document.getElementById('contacto').value;
    const pin = document.getElementById('pin').value;

    await auth.registar({ nome, email, contacto, pin });
    alert('Registo concluído! Faça login.');
    mostrarLogin();
  };

  main.appendChild(form);
}

// Função para mostrar login
function mostrarLogin() {
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  const form = document.createElement('form');

  form.innerHTML = `
    <h3>Login</h3>
    <input type="text" id="login-identifier" placeholder="Nome ou Email" required />
    <input type="password" id="pin" placeholder="PIN" required />
    <button type="submit">Entrar</button>
  `;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const identifier = document.getElementById('login-identifier').value;
    const pin = document.getElementById('pin').value;

    const loggedInUser = await auth.login(identifier, pin);
    if (loggedInUser) {
      alert(`Assalamo Aleikum, ${loggedInUser.nome}`);
      mostrarPaginaBiblioteca(loggedInUser);
    } else {
      alert('Dados inválidos!');
    }
  };

  main.appendChild(form);
}
