let transactions = [];
let id = 0;

const add = document.querySelector("#new");
const modal = document.querySelector(".modal-overflow");

let body = document.createElement("div");
body.classList.add("modal");

add.addEventListener("click", toggleModal);

function setLocalStorage(transactions) {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function getLocalStorage() {
  const transactions = JSON.parse(localStorage.getItem("transactions"));
  id = transactions.length || 0;
  return transactions;
}

function toggleModal(targetId, id) {
  modal.classList.toggle("active");

  renderModal(targetId, id);
}

function renderModal(targetId, id) {
  console.log(targetId);
  body.innerHTML = "";
  if (targetId === "income" || targetId === "expense") {
    body.innerHTML = renderForm();
  } else if (targetId === "edit") {
    body.innerHTML = renderForm(id);
  } else if (targetId === "trash") {
    body.innerHTML = renderDeleteConfirm(id);
  } else {
    body.innerHTML = renderNew();
  }
  modal.appendChild(body);
}

function renderNew() {
  return `
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
}

function renderForm(param) {
  const transaction = transactions.find((t) => t.id === param);

  const newTitle = `<h1>Adicionar ${
    param === "income" ? "receita" : "despeza"
  }</h1>`;

  let editTitle;
  if (transaction) {
    editTitle = `  <h1>Editar ${
      transaction.type === "income" ? "receita" : "despeza"
    }</h1>`;
  }

  return `
    ${typeof param === "number" ? editTitle : newTitle}
    <div class="modal-content">
      <form>
        <input type="hidden" id="id" " value='${
          transaction ? transaction.id : ""
        }'/>
        <input type="text" id="description" placeholder="Descrição..." value='${
          transaction ? transaction.description : ""
        }'/>
        <input type="text" id="amount" placeholder="R$ 0,00" value="${
          transaction ? transaction.amount : ""
        }"/>
        <input type="date" id="date" value="${
          transaction ? transaction.date : ""
        }"/>
        <div class="modal-actions">
          <span class="button cancel" onclick="toggleModal()">cancelar</span>
          <span class="button save" id="${param}" onclick="handleTransaction(this.id)">Salvar</span>
        </div>
      </form>
    </div>
  `;
}

function renderDeleteConfirm(id) {
  const transaction = transactions.find((t) => t.id === id);
  return `
  <div class="modal-content">
    <p>Tem certeza que deseja excluir a transação <strong>${transaction.description}</strong>?</p>
    <div class="modal-actions">
      <span class="button cancel" onclick="toggleModal()">Não</span>
      <span class="button save" onclick="deleteTransaction(${id})">Sim</span>
    </div>
  </div>
  `;
}

function renderTransactions() {
  transactions = getLocalStorage() || [];

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  if (transactions && transactions.length > 0) {
    transactions.forEach((transaction) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${transaction.description}</td>
      <td>${transaction.amount}</td>
      <td>${transaction.date}</td>
      <td>
          <div class="actions">
              <img src="./assets/edit.svg" alt="" id="edit" onclick="toggleModal(this.id, ${transaction.id})">
              <img src="./assets/trash.svg" alt="" id="trash" onclick="toggleModal(this.id, ${transaction.id})">
          </div>
      </td>
      `;

      tbody.appendChild(tr);
    });
  } else {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td style="background-color: #f0f2f5; height: 3rem;" colspan=4>
                      <p style="text-align: center;"> Você não possui transações adicionadas.</p>
                    </td>`;
    tbody.appendChild(tr);
  }
}

function handleTransaction(type) {
  const tid = document.querySelector("#id").value.trim();
  const description = document.querySelector("#description").value.trim();
  const amount = document.querySelector("#amount").value.trim();
  const date = document.querySelector("#date").value.trim();

  if (description === "" || amount === "" || date === "") {
    alert("Por favor, preencha todos os campos!");
  } else {
    if (tid === "") {
      id++;
      const transaction = {
        id,
        description,
        amount,
        date,
        type,
      };
      saveTransaction(transaction);
    } else {
      const transaction = {
        description,
        amount,
        date,
      };
      saveTransaction(transaction, tid);
    }
  }
}

function saveTransaction(transaction, tid) {
  if (tid) {
    const index = transactions.findIndex((t) => t.id === +tid);
    console.log(index);
    console.log(tid);
    transactions[index].description = transaction.description;
    transactions[index].amount = transaction.amount;
    transactions[index].date = transaction.date;
  } else {
    transactions.push(transaction);
  }
  setLocalStorage(transactions);
  toggleModal();
  renderTransactions();
}

function deleteTransaction(id) {
  const transaction = transactions.find((transaction) => transaction.id === id);

  toggleModal();

  const updateTansactions = transactions.filter(
    (transaction) => transaction.id !== id
  );
  setLocalStorage(updateTansactions);
  transactions = updateTansactions;

  renderTransactions();
}

function editTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);
  return transaction;
}

renderTransactions();
