const CONTAINER = document.getElementById("cart-list");
const INFO = JSON.parse(localStorage.getItem("cartlist"));
const QUANTITIES = document.getElementsByClassName("input-quantity");
function DeleteCartItem(e) {
	const ITEMID = Number(e.target.getAttribute("cart-id"));
	console.log(ITEMID);
	const NEWLSCARTLIST = [];
	for (let i = 0; i < INFO.length; i++) {
		if (!(INFO[i].id === ITEMID)) {
			NEWLSCARTLIST.push(INFO[i]);
		}
	}
	console.log(NEWLSCARTLIST);
	localStorage.setItem("cartlist", JSON.stringify(NEWLSCARTLIST));
	location.reload();
}
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

    if (cartitemcards === '') {
        htmlContentToAppend = `
        <p>No se encontraron artículos agregados al carrito</p>
    `
    } else {
        htmlContentToAppend = `${cartitemcards}`
    }

	CONTAINER.innerHTML = htmlContentToAppend;
}
document.addEventListener("DOMContentLoaded", ShowCart);

/*------------------------------Mostrando Precio Final---------------------------------*/

function changeTotalFinal() {
	let totalC=document.getElementById("CostoEnvio").textContent.match(/U\$D (\d+\.\d+)/);
	let totalE=document.getElementById("Total-Productos").textContent.match(/U\$D (\d+\.\d+)/);
	let t =parseFloat(totalC[1])+parseFloat(totalE[1]);
		
	document.getElementById("Total").innerHTML = "U$D " + t.toFixed(2);
}

function changeTotalCost() {
	const cart = document.getElementsByClassName("subtotal");
	let costTotal = 0;
	let match 
	for (let i = 0; i < cart.length; i++) {
		match = cart[i].textContent.match(/([A-Z]{3}) (\d+)/);
		if(match[1]=="UYU"){
			costTotal += (parseInt(match[2]) / 41);
		}else{
			costTotal += parseInt(match[2]);
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

/*----------------------------------------Ata aca---------------------------------------------*/