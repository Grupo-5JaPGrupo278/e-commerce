const CONTAINER = document.getElementById("product-container");
const COMMENTS = document.getElementById("comments");
let currentProduct = {};
let commentaries = [];
function showProduct(){
    let htmlContentToAppend = "";
    
    document.getElementById("title").innerHTML = `${currentProduct.name}`
    
    htmlContentToAppend = `
    <hr>
    <div class="info-container">
        <div class="subtitle">Precio</div>
        <div>${currentProduct.currency} ${currentProduct.cost}</div>
        <div class="subtitle">Descripción</div>
        <div>${currentProduct.description}</div>
        <div class="subtitle">Categoría</div>
        <div>${currentProduct.category}</div>
        <div class="subtitle">Cantidad de Vendidos</div>
        <div>${currentProduct.soldCount}</div>
        <div class="subtitle">Imágenes ilustrativas</div>
        <div class="image-container">
            <img class="article-image" src="${currentProduct.images[0]}">
            <img class="article-image" src="${currentProduct.images[1]}">
            <img class="article-image" src="${currentProduct.images[2]}">
            <img class="article-image" src="${currentProduct.images[3]}">
        </div>
    </div>`
    CONTAINER.innerHTML = htmlContentToAppend;
}

function showComments(){
    let commentsToAppend = "";

    for (let i = 0; i < commentaries.length;i++){
        commentsToAppend += `
        <div class="comment-box">
            <div class="comment-username">${commentaries[i].user} ${commentaries[i].dateTime} ${commentaries[i].score}</div>
            <div class="comment-description">${commentaries[i].description}</div>
        </div>`
    }

    COMMENTS.innerHTML = commentsToAppend;
}

document.addEventListener("DOMContentLoaded",function(e){
    getJSONData(PRODUCT_INFO_URL + localStorage.ProductID + ".json").then(function (resultObj) {
		if (resultObj.status == "ok") {
			currentProduct = resultObj.data;
			showProduct();
		}
	});
    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.ProductID + ".json").then(function (result){
        if (result.status == "ok"){
            commentaries = result.data;
            showComments();
        }
    });
})