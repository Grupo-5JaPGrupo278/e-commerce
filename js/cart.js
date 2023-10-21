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
	for (let i = 0; i < INFO.length; i++) {
		if (INFO[i].id == e.target.id) {
			INFO[i].quantity = e.target.valueAsNumber;
			localStorage.setItem("cartlist", JSON.stringify(INFO));
		}
	}
	const quantity = e.target.valueAsNumber;
	const row = e.target.parentElement.parentElement; // Obtén la fila actual
	const cost = parseFloat(row.querySelector(".cost").textContent.replace(/\D/g, ""));
	const subtotal = quantity * cost;
	row.querySelector(".subtotal").textContent = `${INFO[row.rowIndex - 1].currency} ${subtotal}`;
	changeTotalCost();
}
function ShowCart() {
	let htmlContentToAppend = "";
	let cartitemrows = "";
	for (let i = 0; i < INFO.length; i++) {
		cartitemrows += `
        <tr class="cart">
              <td scope="row"><img class="little-cart-item" src="${INFO[i].imgsource}" alt="cart item"></td>
              <td>${INFO[i].name}</td>
              <td class="cost">${INFO[i].currency} ${INFO[i].cost}</td>
              <td>
                <input 
                onChange="QuantityChange(event)" 
                type="number" 
                value="${INFO[i].quantity}"
                class="input-quantity text-center"
                min="1"
                id="${INFO[i].id}"
                ></input>
              </td>
              <td class="subtotal">${INFO[i].currency} ${INFO[i].cost * INFO[i].quantity}</td>
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
        `;
	}

	if (cartitemrows === "") {
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
    `;
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
    `;
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