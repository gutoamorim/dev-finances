const filterInput = document.querySelector("#filter-input");
const openModalBtn = document.querySelector("#open-modal-btn");
const modal = document.querySelector("#modal");
const tbody = document.querySelector("tbody");

const transactionId = document.querySelector("#transaction-id");
const typesTransactionField = document.querySelectorAll("input[type='radio']");
const descriptionField = document.querySelector("#description");
const amountField = document.querySelector("#amount");
const dateField = document.querySelector("#date");
const closeBtn = document.querySelector("#close-btn");
const saveBtn = document.querySelector("#save-btn");

let { id, transactions } = getLocalStorage();
let balance = { incomes: 0, expenses: 0, total: 0 };

filterInput.addEventListener("input", (e) => handleFilter(e.target.value));

openModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleModal();
});

typesTransactionField.forEach((input) => {
  input.addEventListener("change", () => {
    typeTransaction = getTypeTransaction();
  });
});

amountField.addEventListener("input", (e) => {
  e.target.value = formatCurrency(parseAmount(e.target.value));
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleModal();
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  saveTransaction();
});

function parseAmount(value) {
  return Number(value.replace(/[^0-9]/g, "")) / 100;
}

function toggleModal(id = null) {
  clearModal();
  modal.classList.toggle("show");
  renderModal(id);
}

function clearModal() {
  typesTransactionField.forEach((input) => (input.checked = false));
  descriptionField.value = "";
  amountField.value = "";
  dateField.value = "";
}

function getTypeTransaction() {
  const type = document.querySelector("input[name='type']:checked");
  return type ? type.id : undefined;
}

function renderModal(id) {
  const h2 = document.querySelector("#modal h2");
  const transaction = id ? transactions.find((t) => t.id === id) : null;

  h2.textContent = id ? "Editar Transação" : "Adicionar transação";
  transactionId.value = transaction ? transaction.id : undefined;
  if (transaction) {
    typesTransactionField.forEach((input) => {
      input.checked = input.id === transaction.type;
    });
    descriptionField.value = transaction.description;
    amountField.value = formatCurrency(transaction.amount);
    dateField.value = transaction.date;
  }

  descriptionField.focus();
}

function handleDelete(id) {
  if (window.confirm("Tem certeza que deseja excluir a transação?")) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    setLocalStorage(transactions);
    updateBalance();
    renderTransactions();
  }
}

function saveTransaction() {
  const typeTransaction = getTypeTransaction();
  const description = descriptionField.value.trim();
  const amount = parseAmount(amountField.value);
  const date = dateField.value;

  if (!typeTransaction || !description || !amount || !date) {
    alert("Por favor, preencha todos os campos");
    return;
  }

  if (transactionId.value === "undefined") {
    id++;
    transactions.push({ id, type: typeTransaction, description, amount, date });
  } else {
    const transactionIndex = transactions.findIndex(
      (t) => t.id === +transactionId.value
    );
    if (transactionIndex !== -1) {
      transactions[transactionIndex] = {
        id: transactions[transactionIndex].id,
        type: typeTransaction,
        description,
        amount,
        date,
      };
    }
  }

  setLocalStorage(transactions);
  renderTransactions();
  clearModal();
  updateBalance();
  toggleModal();
}

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderBalance() {
  const incomeCard = document.getElementById("income-card");
  const expenseCard = document.getElementById("expense-card");
  const totalCard = document.getElementById("total-card");

  incomeCard.textContent = formatCurrency(balance.incomes);
  expenseCard.textContent = formatCurrency(balance.expenses);
  totalCard.textContent = formatCurrency(balance.total);
}

function updateBalance() {
  balance = { incomes: 0, expenses: 0, total: 0 };

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      balance.incomes += transaction.amount;
    } else if (transaction.type === "expense") {
      balance.expenses += Math.abs(transaction.amount);
    }
  });

  balance.total = balance.incomes - balance.expenses;
  renderBalance();
}

function setLocalStorage(transactions) {
  localStorage.setItem("@transactions", JSON.stringify(transactions));
  localStorage.setItem("@id", id);
}

function getLocalStorage() {
  const transactions = JSON.parse(localStorage.getItem("@transactions")) || [];
  const id = localStorage.getItem("@id") || 0;
  return { transactions, id };
}

function handleFilter(filter) {
  const filtered = transactions.filter((t) => t.description.includes(filter));
  renderTransactions(filtered);
}

function renderTransactions(filteredTransactions = transactions) {
  tbody.innerHTML = "";
  if (!filteredTransactions.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; background-color: #f0f2f5;">Nenhuma transação encontrada</td></tr>`;
    return;
  }

  filteredTransactions.forEach(({ id, description, amount, date }) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${description}</td>
      <td>${formatCurrency(amount)}</td>
      <td>${formatDate(date)}</td>
      <td class="action-area">
        <i class="fa-solid fa-pen" title="editar" onclick="toggleModal(${id})"></i>
        <i class="fa-solid fa-trash" title="excluir" onclick="handleDelete(${id})"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function formatDate(date) {
  return date.split("-").reverse().join("/");
}

function app() {
  renderTransactions();
  updateBalance();
}

app();
