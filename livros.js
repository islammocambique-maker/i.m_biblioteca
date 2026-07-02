// livros.js

const livros = [
  {
    id: 1,
    titulo: "Tafsir Al-Jalalayn",
    imagem: "imagens/tafseer1.jpg",
    pdf: "pdf/tafseer1.pdf",
    categoria: "Tafsir",
    preco: 0,
    referencia: "REF001",
    status: "gratuito"
  },
  {
    id: 2,
    titulo: "Sahih Bukhari",
    imagem: "imagens/hadith1.jpg",
    pdf: "pdf/hadith1.pdf",
    categoria: "Hadith",
    preco: 10,
    referencia: "REF002",
    status: "pago"
  },
  // Adicione mais livros aqui
];

// Função para mostrar catálogo
function mostrarCatalogo() {
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'grid';

  livros.forEach(livro => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${livro.imagem}" alt="${livro.titulo}" />
      <h4>${livro.titulo}</h4>
      <p>Categoria: ${livro.categoria}</p>
      ${livro.preco > 0 ? `<p>Preço: $${livro.preco}</p>` : `<p>Gratuito</p>`}
      <button>${livro.status === 'gratuito' ? 'Ler' : 'Comprar'}</button>
    `;

    const btn = card.querySelector('button');
    btn.onclick = () => {
      if (livro.status === 'gratuito') {
        abrirPDF(livro);
      } else {
        mostrarPagamento(livro);
      }
    };

    grid.appendChild(card);
  });

  main.appendChild(grid);
}

// Função para abrir PDF
function abrirPDF(livro) {
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  const iframe = document.createElement('iframe');
  iframe.src = livro.pdf;
  iframe.style.width = '100%';
  iframe.style.height = '90vh';

  const voltarBtn = document.createElement('button');
  voltarBtn.textContent = 'Voltar à Biblioteca';
  voltarBtn.onclick = mostrarCatalogo;

  main.appendChild(iframe);
  main.appendChild(voltarBtn);
}
