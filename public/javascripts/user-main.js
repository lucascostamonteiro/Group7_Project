const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const closeButton = document.querySelector(".close-button");
const cancelButton = document.querySelector('.cancel-button')
const submitListButton = document.querySelector('.add-list-button');
const listInput = document.querySelector('.input-list-name');
let listInnerText = '';
let listInner;


// LISTS

let listDeleter = async (event) => {
  const listChildren = Array.from(event.target.parentNode.childNodes);
  listChildren.forEach(ele => {
    if (ele.innerText !== 'edit' && ele.innerText !== 'delete') {
      listInnerText = ele.innerText;
      listInner = ele;
    }
  })
  const res = await fetch('/lists', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ listInnerText })
  });
  const data = await res.json();
  if (data.message === 'Success') {
    let listUl = document.querySelector('.list_summary');
    listUl.removeChild(listInner.parentNode);
  }
}


window.addEventListener("DOMContentLoaded", () => {
  let allLists = Array.from(document.querySelectorAll('.list_summary > li'));
  allLists.forEach(ele => {
    ele.innerHTML = `<div id='list-text' class='list-text'>${ele.innerHTML}</div><button class='list-edit'>edit</button><button class ='list-delete'>delete</button>`
  });

  let listText = Array.from(document.querySelectorAll('.list_summary > li > div'));
  listText.forEach(ele => {
    ele.addEventListener("click", (e) => {
      console.log('user-main.js Line:18')
    })
  })

  let listDelete = Array.from(document.querySelectorAll('.list_summary > li > .list-delete'));
  listDelete.forEach(ele => {
    ele.addEventListener("click", listDeleter)
  })

  let listEdit = Array.from(document.querySelectorAll('.list_summary > li > .list-edit'));
  listEdit.forEach(ele => {
    ele.addEventListener("click", (e) => {
      let modalAddButton = document.querySelector('.add-list-button');
      if (modalAddButton) {
        let modalAddP = document.querySelector('.firstP');
        modalAddP.innerHTML = 'Edit List'
        modalAddButton.innerHTML = 'Edit List';
        modalAddButton.setAttribute('class', 'edit-list-button');
        modalAddButton.removeEventListener('click', listPost);
        modalAddButton.addEventListener('click', listPut);
        const listChildren = Array.from(e.target.parentNode.childNodes);
        listChildren.forEach(ele => {
          if (ele.innerText !== 'edit' && ele.innerText !== 'delete') {
            listInnerText = ele.innerText;
            listInner = ele;
          }
        })
      }
      toggleModal();
    })
  })
});

function toggleModal() {
  modal.classList.toggle("show-modal");
}

modalButton.addEventListener("click", e => {
  let modalAddButton = document.querySelector('.edit-list-button');
  if (modalAddButton) {
    let modalAddP = document.querySelector('.firstP');
    modalAddP.innerHTML = 'Add List'
    modalAddButton.innerHTML = 'Add List';
    modalAddButton.setAttribute('class', 'add-list-button');
    modalAddButton.removeEventListener('click', listPut);
    modalAddButton.addEventListener('click', listPost);
  }
  toggleModal();
});
closeButton.addEventListener("click", toggleModal);
cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  toggleModal();
})

// window.addEventListener("click", (e) => {
//     if (e.target === modal) {
//         toggleModal();
//     }
// });

let listPut = async (event) => {
  const input = listInput.value;
  event.stopPropagation();
  event.preventDefault();
  const res = await fetch('/lists', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input, listInnerText })
  });
  const data = await res.json();
  if (data.message === 'Success') {
    toggleModal();
    let listUl = document.querySelector('.list_summary');
    const newDivList = document.createElement("div");
    const newDivText = document.createElement("div");
    newDivText.setAttribute('id', 'list-text');
    newDivText.classList.add('list-text');
    const newButtonEdit = document.createElement("button");
    newButtonEdit.classList.add('list-text');
    const newButtonDelete = document.createElement("button");
    const divTextText = document.createTextNode(input);
    newDivText.appendChild(divTextText);
    const divButtonEdit = document.createTextNode('edit');
    newButtonEdit.appendChild(divButtonEdit);
    const divButtonDelete = document.createTextNode('delete');
    newButtonDelete.appendChild(divButtonDelete);
    newDivList.appendChild(newDivText);
    newDivList.appendChild(newButtonEdit);
    newDivList.appendChild(newButtonDelete);
    listUl.replaceChild(newDivList, listInner.parentNode);
  }
}

let listPost = async (event) => {
  const input = listInput.value;
  event.stopPropagation();
  event.preventDefault();
  const res = await fetch('/lists', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input })
  });

  const data = await res.json();
  if (data.message === 'Success') {
    toggleModal();

    let listUl = document.querySelector('.list_summary');
    const newDivList = document.createElement("div");
    const newDivText = document.createElement("div");
    newDivText.setAttribute('id', 'list-text');
    newDivText.classList.add('list-text');
    const newButtonEdit = document.createElement("button");
    newButtonEdit.style.padding = '5px';
    newButtonEdit.style.marginLeft = '5px';
    newButtonEdit.style.color = 'white';
    newButtonEdit.style.backgroundColor = '#009DFF';
    newButtonEdit.style.border = 'solid #009DFF 1px';
    newButtonEdit.style.borderRadius = '5px'
    newButtonEdit.classList.add('list-text');
    const newButtonDelete = document.createElement("button");
    newButtonDelete.style.padding = '5px';
    newButtonDelete.style.marginLeft = '5px';
    newButtonDelete.style.color = 'white';
    newButtonDelete.style.backgroundColor =  'rgb(218, 67, 7)';
    newButtonDelete.style.border = 'solid rgb(218, 67, 7) 1px';
    newButtonDelete.style.borderRadius = '5px'
    newButtonEdit.classList.add('list-text');
    const divTextText = document.createTextNode(input);
    newDivText.appendChild(divTextText);
    const divButtonEdit = document.createTextNode('edit');
    newButtonEdit.appendChild(divButtonEdit);
    const divButtonDelete = document.createTextNode('delete');
    newButtonDelete.appendChild(divButtonDelete);
    newDivList.appendChild(newDivText);
    newDivList.appendChild(newButtonEdit);
    newDivList.appendChild(newButtonDelete);
    listUl.appendChild(newDivList);
    newButtonEdit.addEventListener('click', listPut);
    newButtonDelete.addEventListener('click', listDeleter);
  }
}

submitListButton.addEventListener('click', listPost);



// TASKS
