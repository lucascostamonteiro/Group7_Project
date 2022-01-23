const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const closeButton = document.querySelector(".close-button");
const cancelButton = document.querySelector('.cancel-button')
const submitListButton = document.querySelector('.add-list-button');
const listInput = document.querySelector('.input-list-name');
let listInnerText = '';
let listInner;
let currentList = 'All Tasks';


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
  let allLists = Array.from(document.querySelectorAll('.list-listItem'));
  allLists.forEach(ele => {
    ele.innerHTML = `<div id='list-text' class='list-text'>${ele.innerHTML}</div><button class='list-edit'>edit</button><button class ='list-delete'>delete</button>`
  });

  let allTaskList = document.querySelector('.allTasks');
  allTaskList.addEventListener("click", listGet);

  let listText = Array.from(document.querySelectorAll('.list_summary > li > div'));
  listText.forEach(ele => {
    ele.addEventListener("click", listGet)
  })

  let listDelete = Array.from(document.querySelectorAll('.list_summary > li > .list-delete'));
  listDelete.forEach(ele => {
    ele.addEventListener("click", listDeleter)
  })

  let listEdit = Array.from(document.querySelectorAll('.list_summary > li > .list-edit'));
  listEdit.forEach(ele => {
    ele.addEventListener("click", (e) => {
      let modalAddButton = document.querySelector('.edit-task-button, .add-list-button, .edit-list-button');
      if (modalAddButton) {
        let modalAddP = document.querySelector('.firstP');
        modalAddP.innerHTML = 'Edit List'
        modalAddButton.innerHTML = 'Edit List';
        modalAddButton.setAttribute('class', 'edit-list-button');
        modalAddButton.removeEventListener('click', listPost);
        modalAddButton.removeEventListener('click', taskPut);
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

let returnCurrentListNode = function (currentList) {
  let allNormalLi = Array.from(document.querySelectorAll('li > div'));
  let nodeToReturn;
  allNormalLi.forEach(ele => {
    if (ele.innerText === currentList) {
      nodeToReturn = ele;
    }
  })
  let allTasksLi = document.querySelector('.allTasks')
  if (allTasksLi.innerText === currentList) {
    nodeToReturn = allTasksLi
  }
  return nodeToReturn;
}

let listGet = async (event) => {

  let currentListNode = returnCurrentListNode(currentList);
  currentListNode.style.background = null;
  currentListNode.style.opacity = null;
  currentListNode.style.padding = null;
  currentListNode.style.borderRadius = null;

  let listName = event.target.innerText;
  currentList = listName;

  currentListNode = returnCurrentListNode(currentList);
  currentListNode.style.background = 'grey';
  currentListNode.style.opacity = '.6';
  currentListNode.style.padding = '5px';
  currentListNode.style.borderRadius = '10px';

  let res = await fetch('/lists/allLists', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ listName })
  });
  const data = await res.json();

  let taskUl = Array.from(document.querySelectorAll('.notepad-lines > div'));
  taskUl.forEach(ele => {
    if (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }
  })

  data.tasks.forEach(ele => {
    const newDivList = document.createElement("li");
    const newDivText = document.createElement("div");
    newDivText.setAttribute('id', 'list-text');
    newDivText.classList.add('list-text');
    const newButtonEdit = document.createElement("button");
    newButtonEdit.classList.add('list-text');
    const newButtonDelete = document.createElement("button");
    const divTextText = document.createTextNode(ele);
    newDivText.appendChild(divTextText);
    const divButtonEdit = document.createTextNode('edit');
    newButtonEdit.appendChild(divButtonEdit);
    const divButtonDelete = document.createTextNode('delete');
    newButtonDelete.appendChild(divButtonDelete);
    newDivList.appendChild(newDivText);
    newDivList.appendChild(newButtonEdit);
    newDivList.appendChild(newButtonDelete);
    let count = 0;
    taskUl.forEach(ele => {
      if (!ele.firstChild && count === 0) {
        ele.prepend(newDivList)
        count++
      }
    })
    newButtonEdit.addEventListener('click', taskPut); // TO DO
    newButtonDelete.addEventListener('click', taskDeleter); // TO DO
  })
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

modalButton.addEventListener("click", e => {
  let modalAddButton = document.querySelector('.edit-task-button, .add-list-button, .edit-list-button');
  if (modalAddButton) {
    let modalAddP = document.querySelector('.firstP');
    modalAddP.innerHTML = 'Add List'
    modalAddButton.innerHTML = 'Add List';
    modalAddButton.setAttribute('class', 'add-list-button');
    modalAddButton.removeEventListener('click', listPut);
    modalAddButton.removeEventListener('click', taskPut);
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
    const newDivList = document.createElement("li");
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
    listUl.appendChild(newDivList);
    let listArray = Array.from(listUl);
    let nodeToReplace = newDivList;
    listArray.forEach(ele => {
      if (ele.innerText === input) {
        nodeToReplace = ele;
        listUl.replaceChild(newDivList, nodeToReplace);
      } else {
        listUl.replaceChildren(newDivList, listInner);
      }
    })
    newButtonEdit.addEventListener('click', listPut);
    newButtonDelete.addEventListener('click', listDeleter);
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
    const newDivList = document.createElement("li");
    newDivList.setAttribute('class', 'list-name-container')
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
    // newButtonEdit.classList.add('list-text');

    const newButtonDelete = document.createElement("button");
    newButtonDelete.style.padding = '5px';
    newButtonDelete.style.marginLeft = '5px';
    newButtonDelete.style.color = 'white';
    newButtonDelete.style.backgroundColor = 'rgb(218, 67, 7)';
    newButtonDelete.style.border = 'solid rgb(218, 67, 7) 1px';
    newButtonDelete.style.borderRadius = '5px'

    // newButtonDelete.classList.add('list-text');
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

// submitListButton.addEventListener('click', listPost);

let taskPut = async (event) => {
  const input = listInput.value;
  event.stopPropagation();
  event.preventDefault();
  const res = await fetch('/tasks', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input, listInnerText, currentList })
  });
  const data = await res.json();
  if (data.message === 'Success') {
    toggleModal();
    const newDivList = document.createElement("li");
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
    listInner.parentNode.parentNode.replaceChild(newDivList, listInner.parentNode);
    newButtonEdit.addEventListener('click', taskPut);
    newButtonDelete.addEventListener('click', taskDeleter);
  }
}


// TASKS

const taskDivs = Array.from(document.querySelectorAll('.line'));

window.addEventListener("DOMContentLoaded", () => {
  let allTasks = Array.from(document.querySelectorAll('.tasks_summary > li'));
  allTasks.forEach(ele => {
    ele.innerHTML = `<div id='list-text' class='list-text'>${ele.innerHTML}</div><button class='task-edit'>edit</button><button class ='task-delete'>delete</button>`;
    for (let i = taskDivs.length-1; i > 0; i--) {
      if (!taskDivs[i].hasChildNodes()) {
        taskDivs[i].appendChild(ele);
      }
    }
  })

  let taskDelete = Array.from(document.querySelectorAll('.notepad-lines > div > li > .task-delete'));
  taskDelete.forEach(ele => {
    ele.addEventListener("click", taskDeleter)
  })

  let taskEdit = Array.from(document.querySelectorAll('.notepad-lines > div > li > .task-edit'));
  taskEdit.forEach(ele => {
    ele.addEventListener("click", (e) => {
      let modalAddButton = document.querySelector('.edit-task-button, .add-list-button, .edit-list-button');
      if (modalAddButton) {
        let modalAddP = document.querySelector('.firstP');
        modalAddP.innerHTML = 'Edit Task'
        modalAddButton.innerHTML = 'Edit Task';
        modalAddButton.setAttribute('class', 'edit-task-button');
        modalAddButton.removeEventListener('click', listPost);
        modalAddButton.removeEventListener('click', listPut);
        modalAddButton.addEventListener('click', taskPut);
      }
      const listChildren = Array.from(e.target.parentNode.childNodes);
      listChildren.forEach(ele => {
        if (ele.innerText !== 'edit' && ele.innerText !== 'delete') {
          listInnerText = ele.innerText;
          listInner = ele;
        }
      })
      toggleModal();
    })
  })
});

let taskDeleter = async (event) => {
  const listChildren = Array.from(event.target.parentNode.childNodes);
  listChildren.forEach(ele => {
    if (ele.innerText !== 'edit' && ele.innerText !== 'delete') {
      listInnerText = ele.innerText;
      listInner = ele;
    }
  })
  const res = await fetch('/tasks', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ listInnerText })
  });
  const data = await res.json();
  if (data.message === 'Success') {
    listInner.parentNode.parentNode.removeChild(listInner.parentNode);
  }
}

const taskButton = document.querySelector('.button-task');
taskButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const taskInput = document.querySelector('.task-input').value;
  const res = await fetch('/tasks', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskInput, currentList })
  });

  const data = await res.json();
  if (data.message === 'Success') {
    let taskUl = document.querySelector('.tasks_summary');
    const newDivList = document.createElement("li");
    const newDivText = document.createElement("div");
    newDivText.setAttribute('id', 'list-text');
    newDivText.classList.add('list-text');
    const newButtonEdit = document.createElement("button");
    // newButtonEdit.classList.add('list-text');
    const newButtonDelete = document.createElement("button");
    const divTextText = document.createTextNode(taskInput);
    newDivText.appendChild(divTextText);
    const divButtonEdit = document.createTextNode('edit');
    newButtonEdit.appendChild(divButtonEdit);
    const divButtonDelete = document.createTextNode('delete');
    newButtonDelete.appendChild(divButtonDelete);
    newDivList.appendChild(newDivText);
    newDivList.appendChild(newButtonEdit);
    newDivList.appendChild(newButtonDelete);
    taskUl.appendChild(newDivList);

    for (let i = taskDivs.length-1; i > 0; i--) {
      if (!taskDivs[i].hasChildNodes()) {
        taskDivs[i].appendChild(newDivList);
      }
    }

    newButtonEdit.addEventListener('click', taskPut); // TO DO
    newButtonDelete.addEventListener('click', taskDeleter); // TO DO

    newButtonEdit.style.padding = '5px';
    newButtonEdit.style.marginLeft = '5px';
    newButtonEdit.style.color = 'white';
    newButtonEdit.style.backgroundColor = '#009DFF';
    newButtonEdit.style.border = 'solid #009DFF 1px';
    newButtonEdit.style.borderRadius = '5px'
    // newButtonEdit.classList.add('list-text');

    newButtonDelete.style.padding = '5px';
    newButtonDelete.style.marginLeft = '5px';
    newButtonDelete.style.color = 'white';
    newButtonDelete.style.backgroundColor = 'rgb(218, 67, 7)';
    newButtonDelete.style.border = 'solid rgb(218, 67, 7) 1px';
    newButtonDelete.style.borderRadius = '5px'
  }
});
