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
              onChange="QuantityChange(event),changeTotalCost()"
              
              type="number" 
              value="${INFO[i].quantity}"
              class="input-quantity text-center"
              min="1"
              id="${INFO[i].id}"
              />
            </div>
            <hr>
            <div class="card-order">

            
              <div class="d-flex">
              <p class="Moneda">${INFO[i].currency}</p> 
              <span class="subtotal ms-1">${INFO[i].cost * INFO[i].quantity}</span>
              </div>
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


/*------------------------------Mostrando Precio Final---------------------------------*/

function changeTotalFinal() {
	let totalC=document.getElementById("CostoEnvio").textContent.match(/U\$D (\d+\.\d+)/);
	let totalE=document.getElementById("Total-Productos").textContent.match(/U\$D (\d+\.\d+)/);
	let t =parseFloat(totalC[1])+parseFloat(totalE[1]);
		
	document.getElementById("Total").innerHTML = "U$D " + t.toFixed(2);
}

function changeTotalCost() {
	const cost = document.getElementsByClassName("subtotal");
    const type = document.getElementsByClassName("Moneda");
	let costTotal = 0;
	for (let i = 0; i < cost.length; i++) {
		
		if(type[i].innerHTML=="UYU"){
			costTotal += (parseInt(cost[i].innerHTML) / 41);
		}else{
			costTotal += parseInt(cost[i].innerHTML);
		}
		
	}

	document.getElementById("Total-Productos").innerHTML = "U$D " + costTotal.toFixed(2);
	ChangeCostoEnvio();
	changeTotalFinal();
}

function ChangeCostoEnvio() {
	let totalC = document.getElementById("Total-Productos").textContent.match(/U\$D (\d+\.\d+)/);
	const CostoEnvio = document.getElementsByClassName("custom-control-input");
	let inputEnvios;
	for (let i = 0; i < CostoEnvio.length; i++) {
		if (CostoEnvio[i].checked) {
			inputEnvios = CostoEnvio[i];
		}
	}
	if (inputEnvios.id === "goldradio") {
		document.getElementById("CostoEnvio").innerHTML = "U$D " + (parseFloat(totalC[1]) * 0.13).toFixed(2);
	} else if (inputEnvios.id === "premiumradio") {
		document.getElementById("CostoEnvio").innerHTML = "U$D " + (parseFloat(totalC[1]) * 0.07).toFixed(2);
	} else {
		document.getElementById("CostoEnvio").innerHTML = "U$D " + (parseFloat(totalC[1]) * 0.03).toFixed(2);
	}

	changeTotalFinal();
}
document.addEventListener("DOMContentLoaded", changeTotalCost,ChangeCostoEnvio,changeTotalFinal);
// Función para ocultar los metodos de pago

document.addEventListener("DOMContentLoaded", () => {
    const MASTER = document.getElementById("mastercardBtn");
    const VISA = document.getElementById("visaBtn");
    const MAESTRO = document.getElementById("maestroBtn");
    const PAYPAL = document.getElementById("paypalBtn")
    const CONTAINER = document.getElementById("methodInfoContainer");

    MASTER.addEventListener("click", () => {
      CONTAINER.innerHTML = `<div id="mastercard">
      <form class="row g-3">
        <div class="col-12">
          <label for="masterinputCardNumber" class="form-label">Nro de Tarjeta</label>
          <input type="text" class="form-control" id="masterinputCardNumber" placeholder="xxxx-xxxx-xxxx-xxxx-xxxx">
        </div>
        <div class="col-12">
          <label for="masterinputName" class="form-label">Nombre del titular</label>
          <input type="text" class="form-control mb-0" id="masterinputName">
        </div>
        <div class="col-md-6">
          <label for="masterExplirationDate" class="form-label">Fecha de Expiracion</label>
          <input type="email" class="form-control" id="masterExplirationDate">
        </div>
        <div class="col-md-6">
          <label for="masterCVC" class="form-label">CVC</label>
          <input type="password" class="form-control" id="masterCVC">
        </div>
      </form>
    </div>`
    });
    VISA.addEventListener("click", () => {
      CONTAINER.innerHTML = `<div id="visa">
      <form class="row g-3">
        <div class="col-12">
          <label for="visainputCardNumber" class="form-label">Nro de Tarjeta</label>
          <input type="text" class="form-control" id="visainputCardNumber" placeholder="xxxx-xxxx-xxxx-xxxx-xxxx">
        </div>
        <div class="col-12">
          <label for="visainputName" class="form-label">Nombre</label>
          <input type="text" class="form-control mb-0" id="visainputName">
        </div>
        <div class="col-md-6">
          <label for="visaExplirationDate" class="form-label">Fecha de Expiracion</label>
          <input type="email" class="form-control" id="visaExplirationDate">
        </div>
        <div class="col-md-6">
          <label for="visaCVC" class="form-label">CVC</label>
          <input type="password" class="form-control" id="visaCVC">
        </div>
      </form>
    </div>`
    });
    MAESTRO.addEventListener("click", () => {
      CONTAINER.innerHTML = `<div id="maestro">
      <form class="row g-3">
        <div class="col-12">
          <label for="maestroinputCardNumber" class="form-label">Nro de Tarjeta</label>
          <input type="text" class="form-control" id="maestroinputCardNumber" placeholder="xxxx-xxxx-xxxx-xxxx-xxxx">
        </div>
        <div class="col-12">
          <label for="maestroinputName" class="form-label">Nombre</label>
          <input type="text" class="form-control mb-0" id="maestroinputName">
        </div>
        <div class="col-md-6">
          <label for="maestroExplirationDate" class="form-label">Fecha de Expiracion</label>
          <input type="email" class="form-control" id="maestroExplirationDate">
        </div>
        <div class="col-md-6">
          <label for="maestroCVC" class="form-label">CVC</label>
          <input type="password" class="form-control" id="maestroCVC">
        </div>
      </form>
    </div>`
    });
    PAYPAL.addEventListener("click", () => {
      CONTAINER.innerHTML = `<div id="paypal">
      <img src="img/commingsoon-img.png" alt="Commingsoon">
  </div>`
    });
    
  });
