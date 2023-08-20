const CAT_101 = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let currentProductArray = [];

function setCatID(id) {
	localStorage.setItem("catID", id);
	window.location = "products.html";
}
function showProductList() {
	let htmlContentToAppend = "";

    document.getElementById("titulo").innerHTML = `<h2>Productos</h2>
        <p>Verás aquí todos los productos de la categoría ${currentProductArray.catName}.</p>`
	for (let i = 0; i < currentProductArray.products.length; i++) {
		let product = currentProductArray.products[i];

		htmlContentToAppend += `
            <div onclick="setCatID('${product.id}')" class="caja-producto product-container">                                    
                <img src="${product.image}" alt="${product.name}" class="img">                    
                <div class="product-overlay">
                    <div class="info-product">
                        <h4>${product.name}</h4>
                        <small>${product.soldCount} vendidos</small>
                    </div>
                    <h5 id="precio"> ${product.currency} ${product.cost}</h3>
                    <p>${product.description}</p>
                </div>               
            </div>
            `;
	}

	document.getElementById("contenedor-articulo").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCTS_URL + localStorage.catID + ".json").then(function (resultObj) {
		if (resultObj.status == "ok") {
			currentProductArray = resultObj.data;
			showProductList();
		}
	});
});
