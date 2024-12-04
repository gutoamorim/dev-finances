const filterInput = document.querySelector("#filter-input");
const openModalBtn = document.querySelector("#open-modal-btn");
const modal = document.querySelector("#modal");
const tbody = document.querySelector("tbody");

const transactionId = document.querySelector("#transaction-id");
const descriptionField = document.querySelector("#description");
const amountField = document.querySelector("#amount");
const dateField = document.querySelector("#date");
const closeBtn = document.querySelector("#close-btn");
const saveBtn = document.querySelector("#save-btn");

let id = getLocalStorage().id;
let transactions = getLocalStorage().transactions;
let balance = {
  incomes: 0,
  expenses: 0,
  total: 0,
};

filterInput.addEventListener("input", (e) => handleFilter(e.target.value));

openModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleModal();
});

amountField.addEventListener("input", (e) => {
  const value = Number(e.target.value.replace(/[^0-9]/g, "")) / 100;
  e.target.value = formatCurrency(value);
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleModal();
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  saveTransaction();
});

function renderModal(id) {
  const h2 = document.querySelector("#modal h2");
  if (id) {
    h2.textContent = "Editar Transação";
    const transactionEdit = transactions.find((t) => t.id === id);
    transactionId.value = transactionEdit.id;
    descriptionField.value = transactionEdit.description;
    amountField.value = formatCurrency(transactionEdit.amount);
    dateField.value = transactionEdit.date;
  } else {
    h2.textContent = "Adicionar transação";
    transactionId.value = undefined;
    descriptionField.value = "";
    amountField.value = "";
    dateField.value = "";
  }
  descriptionField.focus();
}

function toggleModal(id) {
  clearModal();
  if (modal.classList.contains("show")) {
    modal.classList.remove("show");
    modal.classList.add("hide");
  } else {
    modal.classList.remove("hide");
    modal.classList.add("show");
    renderModal(id);
  }
}

function clearModal() {
  descriptionField.value = "";
  amountField.value = "";
  dateField.value = "";
}

function handleDelete(id) {
  const confirmDelete = window.confirm(
    "Tem certeza que deseja excluir a transação?"
  );
  if (confirmDelete) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    setLocalStorage(transactions);
    updateBalance();
    renderTransactions();
  }
}

function saveTransaction() {
  if (
    descriptionField.value === "" &&
    amountField.value === "" &&
    dateField.value === ""
  ) {
    alert("Por favor, preencha todos os campos");
    return;
  }

  if (transactionId.value === "undefined") {
    id++;
    const description = descriptionField.value.trim();
    const amount = Number(
      amountField.value.replace("R$", "").replace(",", ".").trim()
    );
    const date = dateField.value;

    transactions.push({
      id,
      description,
      amount,
      date,
    });
  } else {
    const transactionIdex = transactions.findIndex(
      (transaction) => transaction.id === +transactionId.value
    );
    if (transactionIdex !== -1) {
      transactions[transactionIdex] = {
        id: transactions[transactionIdex].id,
        description: descriptionField.value.trim(),
        amount: Number(
          amountField.value.replace("R$", "").replace(",", ".").trim()
        ),
        date: dateField.value,
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

function setLocalStorage(transactions) {
  localStorage.setItem("@transactions", JSON.stringify(transactions));
  localStorage.setItem("@id", id);
}

function getLocalStorage() {
  const transactions = JSON.parse(localStorage.getItem("@transactions")) || [];
  const id = localStorage.getItem("@id") || 0;
  return {
    transactions,
    id,
  };
}

function handleFilter(filter) {
  let transactionsFilter = transactions.filter((t) =>
    t.description.includes(filter)
  );
  renderTransactions(transactionsFilter);
}

function renderTransactions(search) {
  tbody.innerHTML = "";
  let tranactionsList;
  if (search) {
    if (search.length === 0 && filterInput.value.length > 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="4" style="text-align: center;  background-color: #f0f2f5;">Nenhuma transação encontrada</td>`;
      tbody.appendChild(tr);
    } else if (search.length === 0 && filterInput.value.length === 0) {
      tranactionsList = transactions;
    } else if (search.length > 0) {
      tranactionsList = search;
    }
  } else {
    tranactionsList = transactions;
  }

  if (tranactionsList && tranactionsList.length > 0) {
    tranactionsList.map(({ id, description, amount, date }) => {
      const tr = document.createElement("tr");
      const transaction = `
                <td>${description}</td>
                <td>${formatCurrency(amount)}</td>
                <td>${formatDate(date)}</td>
                <td class="action-area">
                    <i class="fa-solid fa-pen" title="editar" onclick="toggleModal(${id})"></i>
                    <i class="fa-solid fa-trash" title="excluir" onclick="handleDelete(${id})"></i>
                </td>
          `;

      tr.innerHTML = transaction;
      tbody.appendChild(tr);
    });
  }
}

function app() {
  renderTransactions();
  updateBalance();
}

app();
