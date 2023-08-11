const CAT_101 = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let currentProductArray = [];

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}
function showProductList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.products.length; i++){
        let product = currentProductArray.products[i];

            htmlContentToAppend += `
            <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("contenedor-articulo").innerHTML = htmlContentToAppend;
    }

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CAT_101).then(function(resultObj){
        if (resultObj.status == "ok"){
            currentProductArray = resultObj.data
            showProductList()
        }
    });
});