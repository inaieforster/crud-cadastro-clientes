export function criarElementoCliente(cliente, onDelete) {
  const item = document.createElement("li");
  item.innerHTML = `
    ${cliente.nome} 
    <button data-id="${cliente._id}">X</button>
  `;

  const botao = item.querySelector("button");
  botao.addEventListener("click", () => {
    const confirmar = confirm("Tem certeza que deseja excluir este cliente?");
    if (!confirmar) return;
    onDelete(cliente._id, item);
  });

  return item;
}
