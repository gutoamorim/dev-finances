const openModalBtn = document.querySelector("#open-modal-btn");
const modal = document.querySelector("#modal");
const tbody = document.querySelector("tbody");

const descriptionField = document.querySelector("#description");
const amountField = document.querySelector("#amount");
const dateField = document.querySelector("#date");
const closeBtn = document.querySelector("#close-btn");
const saveBtn = document.querySelector("#save-btn");

let id = 0;
const transactions = [];

let balance = {
  incomes: 0,
  expenses: 0,
  total: 0,
};

openModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleModal();
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleModal();
});

function toggleModal() {
  clearModal();
  if (modal.classList.contains("show")) {
    modal.classList.remove("show");
    modal.classList.add("hide");
  } else {
    modal.classList.remove("hide");
    modal.classList.add("show");
    descriptionField.focus();
  }
}

function clearModal() {
  descriptionField.value = "";
  amountField.value = "";
  dateField.value = "";
}

function renderTransactions() {
  tbody.innerHTML = "";
  transactions.map(({ description, amount, date }) => {
    const tr = document.createElement("tr");
    const transaction = `
              <td>${description}</td>
              <td>${formatCurrency(amount)}</td>
              <td>${formatDate(date)}</td>
              <td class="action-area">
                  <i class="fa-solid fa-pen" title="editar"></i>
                  <i class="fa-solid fa-trash" title="excluir"></i>
              </td>
        `;

    tr.innerHTML = transaction;
    tbody.appendChild(tr);
  });
}

function saveTransaction() {
  if (
    descriptionField.value === "" &&
    amountField.value === "" &&
    dateField.value === ""
  ) {
    return false;
  }

  id++;
  const description = descriptionField.value.trim();
  const amount = Number(amountField.value.trim());
  const date = dateField.value;

  transactions.push({
    id,
    description,
    amount,
    date,
  });

  renderTransactions();
  clearModal();
  updateBalance();
}

function formatCurrency(value) {
  const amount = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return amount;
}

function formatDate(date) {
  const partes = date.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
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
  balance.incomes = 0;
  balance.expenses = 0;

  transactions.forEach((transaction) => {
    if (transaction.amount > 0) {
      balance.incomes += transaction.amount;
    } else {
      balance.expenses += Math.abs(transaction.amount);
    }
  });

  balance.total = balance.incomes - balance.expenses;

  renderBalance();
}

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  saveTransaction();
  toggleModal();
});
