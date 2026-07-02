// app.js

// Ao carregar, verificar se há usuário logado
document.addEventListener('DOMContentLoaded', () => {
  const usuario = auth.getUserLogado();
  if (usuario) {
    mostrarPainelUsuario(usuario);
  } else {
    mostrarTelaInicial();
  }
});

// Mostrar painel do usuário logado
function mostrarPainelUsuario(user) {
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  const saudacao = document.createElement('h2');
  saudacao.textContent = `Assalamo Aleikum, ${user.nome}`;

  const msgBoasVindas = document.createElement('p');
  msgBoasVindas.textContent = 'Seja bem-vindo à Biblioteca Islam Moçambique. Que Allah aumente o seu conhecimento.';

  const btnSair = document.createElement('button');
  btnSair.textContent = 'Sair';
  btnSair.onclick = () => {
    auth.logout();
    mostrarTelaInicial();
  };

  const btnVerCatalogo = document.createElement('button');
  btnVerCatalogo.textContent = 'Ver Biblioteca';
  btnVerCatalogo.onclick = mostrarCatalogo;

  main.appendChild(saudacao);
  main.appendChild(msgBoasVindas);
  main.appendChild(btnVerCatalogo);
  main.appendChild(btnSair);
}
