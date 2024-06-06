let transactions = [];
let id = 0;

const incomes = document.querySelector("#incomes");
const expenses = document.querySelector("#expenses");
const total = document.querySelector("#total");

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
  body.innerHTML = "";
  if (targetId === "income" || targetId === "expense") {
    body.innerHTML = renderForm(targetId);
    formatCurrencyInput();
  } else if (targetId === "edit") {
    body.innerHTML = renderForm(id);
    formatCurrencyInput();
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
      const amount = formatCurrency(+transaction.amount);
      const date = new Date(transaction.date).toLocaleDateString();
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${transaction.description}</td>
      <td>${amount}</td>
      <td>${date}</td>
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

  renderBalance();
}

function renderBalance() {
  const transactions = getLocalStorage();
  const totalIncomes = transactions
    .filter((transaction) => transaction.type === "income")
    .map((transaction) => +transaction.amount)
    .reduce((a, b) => a + b, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => +transaction.amount)
    .reduce((a, b) => a + b, 0);

  const balance = totalIncomes - totalExpenses;

  incomes.innerHTML = formatCurrency(totalIncomes);
  expenses.innerHTML = formatCurrency(totalExpenses);
  total.innerHTML = formatCurrency(balance);
}

function handleTransaction(type) {
  const tid = document.querySelector("#id").value.trim();
  const description = document.querySelector("#description").value.trim();
  const amount =
    Number(document.querySelector("#amount").value.trim().replace(/\D/g, "")) /
    100;

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

function formatCurrency(value) {
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

function formatCurrencyInput() {
  const currencyInput = document.querySelector("#amount");
  currencyInput.addEventListener("input", (e) => {
    e.target.value = formatCurrency(
      Number(e.target.value.replace(/\D/g, "") / 100)
    );
  });
}

renderTransactions();
