const openModalBtn = document.querySelector("#open-modal-btn");
const modal = document.querySelector("#modal");
const tbody = document.querySelector("tbody");

const descriptionField = document.querySelector("#description");
const amountField = document.querySelector("#amount");
const dateField = document.querySelector("#date");
const closeBtn = document.querySelector("#close-btn");
const saveBtn = document.querySelector("#save-btn");

const transactions = [];
let id = 0;

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
              <td>${amount}</td>
              <td>${date}</td>
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
  const amount = amountField.value.trim();
  const date = dateField.value;

  transactions.push({
    id,
    description,
    amount,
    date,
  });

  renderTransactions();
  clearModal();
}

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  saveTransaction();
  toggleModal();
});
