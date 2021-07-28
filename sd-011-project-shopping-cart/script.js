const CARTITEMS = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function updateTotalPrice() {
  let items = document.getElementsByClassName('cart__item');
  items = Array.from(items);
  console.log(items);
  const prices = items.map((domElement) => parseFloat(domElement.dataset.price, 10));
  console.log(prices);
  const result = prices.reduce((acc, curr) => acc + curr, 0);
  const priceEl = document.querySelector('.total-price');
  priceEl.innerText = result;
}

function saveItemsLocalStorage() {
  const cart = document.getElementsByClassName('cart__items')[0].innerHTML;
  localStorage.setItem('myListItems', cart);
}

function cartItemClickListener(event) {
  event.target.parentNode.removeChild(event.target);
  updateTotalPrice();
  saveItemsLocalStorage();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.dataset.price = salePrice;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function handleButtonAdd(event) {
  const sku = event.target.parentElement.querySelector('.item__sku').innerText;
  // OU getSkuFromProductItem(event.target.parentElement)
  fetch(`https://api.mercadolibre.com/items/${sku}`)
    .then((response) => response.json())
    .then((response) => {
      console.log('AQUI', response);
      const li = createCartItemElement({ sku: response.id, 
        name: response.title,
        salePrice: response.price });
      const cart = document.querySelector(CARTITEMS);
      cart.appendChild(li);

      updateTotalPrice();

      saveItemsLocalStorage();
    });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonElement = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonElement.addEventListener('click', handleButtonAdd);
  section.appendChild(buttonElement);

  return section;
}

function cleanCart() {
  const ol = document.querySelector(CARTITEMS);
  ol.innerHTML = ' ';
  saveItemsLocalStorage();
  updateTotalPrice();
}

function loadFromLocalStorage() {
  const savedItems = window.localStorage.getItem('myListItems');
  document.querySelector(CARTITEMS).innerHTML = savedItems;
  let liItemsSaved = document.getElementsByClassName('cart__item');
  liItemsSaved = Array.from(liItemsSaved);
  liItemsSaved.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
}

function loadProductsFromAPI() {
  const items = document.querySelector('.items');
  const span = document.createElement('span');
  span.className = 'loading';
  span.innerText = 'loading...';
  items.appendChild(span);
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((response) => response.json())
  .then((body) => {
    console.log(body);
    items.innerText = '';
    body.results.forEach((value) => {
      const obj = { sku: value.id, name: value.title, image: value.thumbnail };
      items.appendChild(createProductItemElement(obj));
    });
  });
}

window.onload = function onload() {
  loadFromLocalStorage();

  loadProductsFromAPI();

  updateTotalPrice();

  const buttonEmpty = document.querySelector('.empty-cart');
  buttonEmpty.addEventListener('click', cleanCart);
};