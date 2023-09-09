let currentProductArray = [];
let currentComentarios = [];

function showProductList() {
	let htmlContentToAppend = "";
	document.getElementById("contenedor-infoproducts").innerHTML += `
    <h3><b>${currentProductArray.name}</b></h3>
    <p><b>${currentProductArray.description}</b></p>
    <p><b>${currentProductArray.cost}</b></p>
    <p><b>${currentProductArray.category}</b></p>
    <p><b>${currentProductArray.soldCount}</b></p>
    
    `;
	//for (let i = 0; i < currentProductArray.images.length; i++) {
	//let product = currentProductArray.images[i];
	htmlContentToAppend += ` <div id="carouselExample" class="carousel slide">
         <div class="carousel-inner">
           <div class="carousel-item active">
             <img src="${currentProductArray.images[0]}" class="d-block w-100" alt="...">
           </div>
           <div class="carousel-item">
             <img src="${currentProductArray.images[1]}" class="d-block w-100" alt="...">
           </div>
           <div class="carousel-item">
             <img src="${currentProductArray.images[2]}" class="d-block w-100" alt="...">
           </div>
           <div class="carousel-item">
             <img src="${currentProductArray.images[3]}" class="d-block w-100" alt="...">
           </div>
         </div>
         <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
           <span class="visually-hidden">Previous</span>
         </button>
         <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
           <span class="carousel-control-next-icon" aria-hidden="true"></span>
           <span class="visually-hidden">Next</span>
         </button>
       </div> `;
	//}

	document.getElementById("contenedor-infoimagenes").innerHTML = htmlContentToAppend;
}
function showComent() {
	let htmlContentToAppendComent = "";

	for (let i = 0; i < currentComentarios.length; i++) {
		htmlContentToAppendComent += `<div class="comentario">
        <div class="d-flex w-100 justify-content-between">
          <h6><b>${currentComentarios[i].user}</b>-
          <span  class="fa fa-star star "></span>
          <span class="fa fa-star star"></span>
          <span class="fa fa-star star"></span>
          <span class="fa fa-star star"></span>
          <span class="fa fa-star star"></span> </h6>
          <small>${currentComentarios[i].dateTime}</small>
        </div>
        <p>${currentComentarios[i].description}</p>
    </div>
    `;
	}

	document.getElementById("contenedor-comentarios").innerHTML = htmlContentToAppendComent;
	/*let comentarios = document.getElementsByClassName("comentario");

	for (let i = 0; i < comentarios.length; i++) {
		let estrellas = comentarios[i].getElementsByClassName("star");
		let score = currentComentarios[i].score;

		for (let j = 0; j < score; j++) {
			estrellas[j].classList.add("checked");
		}
	}*/

	let coment = document.getElementsByClassName("comentario");
	for (let i = 0; i < coment.length; i++) {
		let star = coment[i].getElementsByClassName("star");
		for (let j = 0; j < currentComentarios[i].score; j++) {
			star[j].classList.add("checked");
		}
	}
}

document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCT_INFO_URL + localStorage.catID + ".json").then(function (resultObj) {
		if (resultObj.status == "ok") {
			currentProductArray = resultObj.data;
			showProductList();
		}
	});
	getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.catID + ".json").then(function (resultComent) {
		if (resultComent.status == "ok") {
			currentComentarios = resultComent.data;
			showComent();
		}
	});
});
