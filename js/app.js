import { Cliente } from "./classes.js";
import { criarElementoCliente } from "./utils.js";

const API_URL = "https://crudcrud.com/api/abf1b4202a4144488a3524b053c2df6c/cadastrar-cliente";
const form = document.getElementById("form-cadastro");
const lista = document.getElementById("lista-clientes");

function renderizarClientes(listaClientes) {
  listaClientes
    .map(({ nome, email, _id }) => new Cliente(nome, email, _id))
    .forEach(cliente => {
      const item = criarElementoCliente(cliente, deletarCliente);
      lista.appendChild(item);
    });
}

function deletarCliente(id, item) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => item.remove())
    .catch(err => console.error("Erro ao deletar:", err));
}

function cadastrarCliente(cliente) {
  // cria objeto apenas com nome e email, sem _id
  const dadosCliente = {
    nome: cliente.nome,
    email: cliente.email
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosCliente) // envia só nome e email
  })
    .then(res => res.json())
    .then(data => {
      // agora sim, cria Cliente com o _id que veio da API
      const novoCliente = new Cliente(data.nome, data.email, data._id);
      const item = criarElementoCliente(novoCliente, deletarCliente);
      lista.appendChild(item);
      form.reset();
    })
    .catch(err => console.error("Erro ao cadastrar:", err));
}


form.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!nome || !email) return;

  const cliente = new Cliente(nome, email);
  cadastrarCliente(cliente);
});

fetch(API_URL)
  .then(res => res.json())
  .then(renderizarClientes)
  .catch(err => console.error("Erro ao buscar clientes:", err));
