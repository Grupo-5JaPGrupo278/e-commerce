const CONTAINER = document.getElementById('cart-list');
const INFO = JSON.parse(localStorage.getItem('cartlist'));
const QUANTITIES = document.getElementsByClassName('input-quantity');
// Función para borrar Items del Carrito
function DeleteCartItem(e) {
    const ITEMID = Number(e.target.getAttribute('cart-id'))
    const NEWLSCARTLIST = [];
    for (let i = 0; i < INFO.length; i++) {
        if (!(INFO[i].id === ITEMID)) {
            NEWLSCARTLIST.push(INFO[i])
        }
    }
    localStorage.setItem('cartlist', JSON.stringify(NEWLSCARTLIST));
    location.reload();
}
// Función para cambiar las cantidades de los Items en el Carrito Y calcular el nuevo Subtotal
function QuantityChange(e) {
  // Agregar Item Quantity al LS y reimprimirlo continuamente
    for (let i = 0; i < INFO.length; i++){
      if ( INFO[i].id == e.target.id){
        INFO[i].quantity = e.target.valueAsNumber;
        localStorage.setItem('cartlist',JSON.stringify(INFO))
      }
    }
    const quantity = e.target.valueAsNumber;
    const cardselected = e.target.parentElement.parentElement; // Obtén la carta actual
    const cost = parseFloat(cardselected.querySelector('.cost').textContent);
    const subtotal = quantity * cost;
    cardselected.querySelector('.subtotal').textContent = `${subtotal}`;
}
// Impresora de artículos en el Carrito
function ShowCart() {
    let htmlContentToAppend = '';
    let cartitemcards = '';
    for (let i = 0; i < INFO.length; i++) {
        cartitemcards += `<article  class="article-preview">
        <figure>
            <img
                src="${INFO[i].imgsource}"
                alt="${INFO[i].name}"
                title="${INFO[i].name}"
            />
        </figure>
        <div>
            <h2>${INFO[i].name}</h2>
            <p>${INFO[i].currency} <span class="cost">${INFO[i].cost}</span></p>
            <hr>
            <div class="card-order">
              <p>Cantidad: </p>
              <input 
              onChange="QuantityChange(event)" 
              type="number" 
              value="${INFO[i].quantity}"
              class="input-quantity text-center"
              min="1"
              id="${INFO[i].id}"
              />
            </div>
            <hr>
            <div class="card-order">
              <p>${INFO[i].currency} <span class="subtotal">${INFO[i].cost * INFO[i].quantity}</span></p>
              <input
                  onClick="DeleteCartItem(event)"
                  type="image" 
                  src="img/delete_btn.png" 
                  class="deleteCartItemBtn" 
                  cart-id="${INFO[i].id}"
                  />
            </div>
            
        </div>
    </article>`
    }
// Si no hay artículos en el carrito, se muestra el siguiente mensaje
    if (cartitemcards === '') {
        htmlContentToAppend = `
        <p>No se encontraron artículos agregados al carrito</p>
    `
    } else {
        htmlContentToAppend = `${cartitemcards}`
    }


    CONTAINER.innerHTML = htmlContentToAppend
    
}
document.addEventListener('DOMContentLoaded', ShowCart);