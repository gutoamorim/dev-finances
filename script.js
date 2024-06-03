const transactions = [];
let id = 0;

const add = document.querySelector("#new");
const modal = document.querySelector(".modal-overflow");

let body = document.createElement("div");
body.classList.add("modal");

add.addEventListener("click", () => toggleModal("new"));

function toggleModal(type) {
  modal.classList.toggle("active");

  if (modal.classList.contains("active")) {
    renderModal(type);
  }
}

function renderModal(type) {
  body.innerHTML = "";
  if (type) {
    if (type === "new") {
      body.innerHTML = `
        <h1>Adicionar transação</h1>
        <div class="modal-content">
          <div class="type-transaction-container">
            <div class="type-transaction" id="income" onclick="renderModal(this.id)">
              <img src="./assets/income.svg" alt="Imagem ilustrativa do card entradas">  
              Receita
            </div>
              <div class="type-transaction" id="expense"  onclick="renderModal(this.id)">
              <img src="./assets/expense.svg" alt="Imagem ilustrativa do card entradas">  
              Despeza
            </div>
          </div>
        </div>
      `;
    } else if (type === "income" || type === "expense") {
      body.innerHTML = `
      <h1>Adicionar ${type === "income" ? "receita" : "despeza"}</h1>
      <div class="modal-content">
        <form>
          <input type="text" id="description" placeholder="Descrição..."/>
          <input type="text" id="amount" placeholder="R$ 0,00"/>
          <input type="date" id="date"/>
          <div class="modal-actions">
            <span class="button cancel" onclick="toggleModal()">cancelar</span>
            <span class="button save" id="${type}" onclick="handleTransaction(this.id)">Salvar</span>
          </div>
        </form>
      </div>
    `;
    }
    modal.appendChild(body);
  }
}

function handleTransaction(type) {
  const description = document.querySelector("#description").value.trim();
  const amount = document.querySelector("#amount").value.trim();
  const date = document.querySelector("#date").value.trim();

  if (description === "" || amount === "" || date === "") {
    alert("Por favor, preencha todos os campos!");
  } else {
    id++;
    const transaction = {
      id,
      description,
      amount,
      date,
      type,
    };
    saveTransaction(transaction);
  }
}

function saveTransaction(transaction) {
  transactions.push(transaction);
  toggleModal();
}
