const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const closeButton = document.querySelector(".close-button");
const cancelButton = document.querySelector('.cancel-button')
const submitListButton = document.querySelector('.submit-list');
const listInput = document.querySelector('.list-input');

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

submitListButton.addEventListener('click', async(event) => {
    const input = listInput.value;
    event.preventDefault();
    const res = await fetch('/lists', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input })
      });
      const data = await res.json();
      console.log(data);
      if (data.message === 'Success') {
        console.log('very nice!!!')
      }
});
