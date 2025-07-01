const clientes = document.getElementById("lista-clientes");
const form = document.getElementById("form-cadastro");
const API_URL = "https://crudcrud.com/api/9a50f0d840b6407e9e24b4b58d0c04ce/cadastrar-cliente";

function adicionarClienteNaLista(cliente) {
    const item = document.createElement("li");
    item.innerHTML = `${cliente.nome} <button data-id="${cliente._id}">X</button>`;
    
    const botao = item.querySelector("button");
    botao.addEventListener("click", () => {
        const confirmar = confirm("Tem certeza que deseja excluir este cliente?");
        if (!confirmar) return;

        fetch(`${API_URL}/${cliente._id}`, {
            method: "DELETE"
        })
        .then(() => {
            item.remove();
        })
        .catch(error => console.error("Erro ao deletar cliente:", error));
    });

    clientes.appendChild(item);
}

fetch(API_URL)
    .then(response => response.json())
    .then(listaClientes => {
        listaClientes.forEach(adicionarClienteNaLista);
    })
    .catch(error => console.error("Erro ao carregar clientes:", error));


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(cliente => {
        adicionarClienteNaLista(cliente);
        form.reset(); // limpa o formulário
    })
    .catch(error => console.error("Erro ao cadastrar cliente:", error));
});
