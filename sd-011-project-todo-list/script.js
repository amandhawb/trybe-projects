function changeColor(event) {
  const listColored = document.getElementsByClassName('listItem');
  for (let i = 0; i < listColored.length; i += 1) {
    listColored[i].style.backgroundColor = '';
  }
  event.target.style.backgroundColor = 'rgb(128,128,128)';
}
function lineThrough(event) {
  // let isCompleted = event.target.classList.contains('completed');
  // if (isCompleted === true) {
  //   event.target.classList.remove('completed');
  // } else {
  //   event.target.classList.add('completed');
  // }
  event.target.classList.toggle('completed');
}

function addButton() {
  // pegando os elementos
  const olList = document.getElementById('lista-tarefas');
  const inputTextElement = document.getElementById('texto-tarefa');
  // pegando o valor (texto) que está dentro do input
  const inputText = inputTextElement.value;
  // criando LI
  const createLi = document.createElement('li');
  createLi.classList.add('listItem');
  // atribuindo o INNERTEXT para o olList
  createLi.innerText = inputText;
  createLi.addEventListener('click', changeColor);
  createLi.addEventListener('dblclick', lineThrough);
  olList.appendChild(createLi);
  // limpando o elemento:
  inputTextElement.value = '';
}

function deleteItem() {
  // const listItens = document.querySelectorAll('.listItem');
  // for (let i = 0; i < listItens.length; i += 1) {
  //   let currentElement = listItens[i];
  //   currentElement.parentNode.removeChild(currentElement);
  // }
  const olElement = document.querySelector('ol');
  olElement.innerText = '';
}

function doneItem() {
  const doneItens = document.querySelectorAll('.completed');
  for (let i = 0; i < doneItens.length; i += 1) {
    let currentElement = doneItens[i];
    currentElement.parentNode.removeChild(currentElement);
  }
  handleSaveList();
}

function handleSaveList() {
  const olElement = document.querySelector('ol');
  localStorage.setItem('todolist', olElement.innerHTML);
  // let itemsArray = [];
  // const listItems = document.getElementsByClassName('listItem');
  // for (let i = 0; i < listItems.length; i += 1) {
  //   let currentElement = listItems[i];
  //   itemsArray.push(currentElement.innerText);
  // }
  // localStorage.setItem('items', JSON.stringify(itemsArray));
}

function loadElements() {
  const olElement = document.querySelector('ol');
  olElement.innerHTML = localStorage.getItem('todolist');
  const allItems = document.getElementsByClassName('listItem');
  for (let i = 0; i < allItems.length; i += 1) {
    allItems[i].addEventListener('click', changeColor);
    allItems[i].addEventListener('dblclick', lineThrough);
  }
}

const saveList = document.getElementById('salvar-tarefas');
saveList.addEventListener('click', handleSaveList);

const doneButtom = document.getElementById('remover-finalizados');
doneButtom.addEventListener('click', doneItem);

const deleteButtom = document.getElementById('apaga-tudo');
deleteButtom.addEventListener('click', deleteItem);

const button = document.getElementById('criar-tarefa');
button.addEventListener('click', addButton);

loadElements();
