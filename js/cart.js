const CONTAINER = document.getElementById('cart-list');
const INFO = JSON.parse(localStorage.getItem('cartlist'));
const QUANTITIES = document.getElementsByClassName('input-quantity');
function DeleteCartItem(e) {
    const ITEMID = Number(e.target.getAttribute('cart-id'))
    console.log(ITEMID)
    const NEWLSCARTLIST = [];
    for (let i = 0; i < INFO.length; i++) {
        if (!(INFO[i].id === ITEMID)) {
            NEWLSCARTLIST.push(INFO[i])
        }
    }
    console.log(NEWLSCARTLIST);
    localStorage.setItem('cartlist', JSON.stringify(NEWLSCARTLIST));
    location.reload();
}
function QuantityChange(e) {
    const quantity = e.target.valueAsNumber;
    const row = e.target.parentElement.parentElement; // Obtén la fila actual
    const cost = parseFloat(row.querySelector('.cost').textContent.replace(/\D/g, ''));
    const subtotal = quantity * cost;
    row.querySelector('.subtotal').textContent = `${INFO[row.rowIndex - 1].currency} ${subtotal}`;
}
function ShowCart() {
    let htmlContentToAppend = '';
    let cartitemrows = '';
    for (let i = 0; i < INFO.length; i++) {
        cartitemrows += `
        <tr>
              <td scope="row"><img class="little-cart-item" src="${INFO[i].imgsource}" alt="cart item"></td>
              <td>${INFO[i].name}</td>
              <td class="cost">${INFO[i].currency} ${INFO[i].cost}</td>
              <td>
                <input 
                onChange="QuantityChange(event)" 
                type="number" 
                value="1"
                class="input-quantity"
                min="1"
                id="quantity-${INFO[i].id}"
                ></input>
              </td>
              <td class="subtotal">${INFO[i].currency} ${INFO[i].cost}</td>
              <td>
                <input
                onClick="DeleteCartItem(event)"
                type="image" 
                src="img/delete_btn.png" 
                class="deleteCartItemBtn" 
                cart-id="${INFO[i].id}"
                >
              </td>
            </tr>
        `
    }

    if (cartitemrows === '') {
        htmlContentToAppend = `
    <table class="table">
          <thead>
            <tr>
              <th></th>
              <th scope="col">Nombre</th>
              <th scope="col">Costo</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <p>No se encontraron artículos agregados al carrito</p>
    `
    } else {
        htmlContentToAppend = `
    <table class="table">
          <thead>
            <tr>
              <th></th>
              <th scope="col">Nombre</th>
              <th scope="col">Costo</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${cartitemrows}
          </tbody>
        </table>
    `
    }


    CONTAINER.innerHTML = htmlContentToAppend
}
document.addEventListener('DOMContentLoaded', ShowCart);