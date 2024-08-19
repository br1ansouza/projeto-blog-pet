function carregarDados() {
  console.log("Carregando dados dos posts...");
  
  const postsNaMemoria = JSON.parse(localStorage.getItem('pets')) || [];
  console.log("Posts encontrados no localStorage:", postsNaMemoria);

  const lista = document.querySelector('#postsTable tbody');
  lista.innerHTML = '';

  postsNaMemoria.forEach((post) => {
      console.log("Processando post:", post);

      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${post.nome}</td>
          <td>${post.foto}</td>
          <td>${post.idade}</td>
          <td>${post.descricao}</td>
          <td>${post.tipo}</td>
          <td>${new Date(post.id).toLocaleDateString()}</td>
          <td><button class="delete-btn" data-id="${post.id}">🗑️</button></td>
      `;
      lista.appendChild(row);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function() {
          const idRecebido = this.getAttribute('data-id');
          console.log("Botão de deletar clicado, ID:", idRecebido);
          deletar(idRecebido);
      });
  });
}

function deletar(idRecebido) {
  console.log("Iniciando a função deletar para ID:", idRecebido);
  const postsAtuaisNaMemoria = JSON.parse(localStorage.getItem('pets')) || [];
  console.log("Posts antes da filtragem:", postsAtuaisNaMemoria);

  const postsFiltrados = postsAtuaisNaMemoria.filter((item) => item.id !== parseInt(idRecebido));
  console.log("Posts após filtragem:", postsFiltrados);

  localStorage.setItem('pets', JSON.stringify(postsFiltrados));
  carregarDados();
}

document.addEventListener('DOMContentLoaded', carregarDados);
document.getElementById('newPostBtn').addEventListener('click', function() {
  window.location.href = 'index.html';
});
