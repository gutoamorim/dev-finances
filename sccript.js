const openModalBtn = document.querySelector("#open-modal-btn");
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close-btn");

openModalBtn.onclick = () => {
  modal.classList.add("show");
  modal.classList.remove("hide");
};

closeBtn.onclick = (e) => {
  e.preventDefault();
  modal.classList.add("hide");
  modal.classList.remove("show");
};
