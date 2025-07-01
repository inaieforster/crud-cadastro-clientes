// POST: https://crudcrud.com/api/a450c334e4df48009f555284fcafa0d3/cadastrar-cliente "nome" e "e-mail"
// GET: 


const apiUrl = 'https://crudcrud.com/api/SEU_ENDPOINT_AQUI/clientes'; // <-- Substitua pelo seu endpoint real do CrudCrud

const form = document.getElementById('form-cadastro');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const listaClientes = document.getElementById('lista-clientes');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const cliente = {
    nome: nomeInput.value,
    email: emailInput.value,
  };

  try {
    const resposta = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente),
    });

    if (resposta.ok) {
      nomeInput.value = '';
      emailInput.value = '';
      carregarClientes();
    } else {
      console.error('Erro ao cadastrar cliente');
    }
  } catch (erro) {
    console.error('Erro de rede:', erro);
  }
});

async function carregarClientes() {
  try {
    const resposta = await fetch(apiUrl);
    const dados = await resposta.json();

    listaClientes.innerHTML = '';
    dados.forEach((cliente) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${cliente.nome}</strong> - ${cliente.email}
        <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
      `;
      listaClientes.appendChild(li);
    });
  } catch (erro) {
    console.error('Erro ao carregar clientes:', erro);
  }
}

async function excluirCliente(id) {
  try {
    const resposta = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });

    if (resposta.ok) {
      carregarClientes();
    } else {
      console.error('Erro ao excluir cliente');
    }
  } catch (erro) {
    console.error('Erro de rede:', erro);
  }
}

// Carrega os clientes ao abrir a página
carregarClientes();
