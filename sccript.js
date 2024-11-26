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

openModalBtn.onclick = () => {
  modal.classList.add("show");
  modal.classList.remove("hide");
  descriptionField.focus();
};

closeBtn.onclick = (e) => {
  e.preventDefault();
  modal.classList.add("hide");
  modal.classList.remove("show");
};

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

  console.log(transactions);

  //   const tr = document.createElement("tr");
  //   const transaction = `
  //         <td>${description}</td>
  //         <td>${amount}</td>
  //         <td>${date}</td>
  //         <td class="action-area">
  //             <i class="fa-solid fa-pen" title="editar"></i>
  //             <i class="fa-solid fa-trash" title="excluir"></i>
  //         </td>
  //   `;

  //   tr.innerHTML = transaction;

  //   tbody.appendChild(tr);
}

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  saveTransaction();
  modal.classList.add("hide");
  modal.classList.remove("show");
});
