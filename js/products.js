const CAT_101 = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let currentProductArray = [];

function setCatID(id) {
	localStorage.setItem("catID", id);
	window.location = "products.html";
}
function showProductList() {
	let htmlContentToAppend = "";

	document.getElementById("titulo").innerHTML = `<h2>Productos</h2>
        <p>Verás aquí todos los productos de la categoría ${currentProductArray.catName}.</p>`;
	for (let i = 0; i < currentProductArray.products.length; i++) {
		let product = currentProductArray.products[i];

		htmlContentToAppend += `
            <div onclick="setCatID('${product.id}')" class="caja-producto product-container">                                    
                <img src="${product.image}" alt="${product.name}" class="img">                    
                <div class="product-overlay">
                    <div class="info-product">
                        <h4 id="n">${product.name}</h4>
                        <small>${product.soldCount} vendidos</small>
                    </div>
                    <h5 id="precio"> ${product.currency} ${product.cost}</h3>
                    <p id="d">${product.description}</p>
                </div>               
            </div>
            `;
	}

	document.getElementById("contenedor-articulo").innerHTML = htmlContentToAppend;
}

document.addEventListener("keyup", function (e) {
	//detecta el teclado y procede a hacer una accion
	if (e.target.matches("#buscador")) {
		//si donde se detecto el target coidide con el id buscador entra al if
		let product = document.querySelectorAll(".product-container"); //traigo todo los productos
		for (p of product) {
			//recorro los productos
			if (
				//aca busco los nombre y las descripciones las paso a minuscula y con include comparo coicidencias con lo que escribi en el buscador
				p.querySelector("#n").innerHTML.toLowerCase().includes(e.target.value) ||
				p.querySelector("#d").innerHTML.toLowerCase().includes(e.target.value)
			) {
				p.classList.remove("filtro"); //en caso de que sea verdadero le saco el filtro que el que los oculta
			} else {
				p.classList.add("filtro"); //aca se los agrego porque no coincide
			}
		}

		/*document.querySelectorAll(".product-container").forEach(producto => {
			if (
				producto.querySelector("#n").innerHTML.toLowerCase().includes(e.target.value) ||
				producto.querySelector("#d").innerHTML.toLowerCase().includes(e.target.value)
			) {
				producto.classList.remove("filtro");
			} else {
				producto.classList.add("filtro");
			}

			//console.log(producto.querySelector("#n").innerHTML.toLowerCase().includes(e.target.value));
		});*/
	}
});

document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCTS_URL + localStorage.catID + ".json").then(function (resultObj) {
		if (resultObj.status == "ok") {
			currentProductArray = resultObj.data;
			showProductList();
		}
	});
});
