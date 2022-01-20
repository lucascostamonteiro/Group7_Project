const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const closeButton = document.querySelector(".close-button");
const cancelButton = document.querySelector('.cancel-button')

function toggleModal() {
    modal.classList.toggle("show-modal");
}

modalButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
cancelButton.addEventListener('click', toggleModal);

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        toggleModal();
    }
});
