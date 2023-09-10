
/* ===========================[coments]================================ */
const USERNAME = document.getElementById("cmntUser");
const PROFILEIMAGE = document.getElementById("profileImage")
const SENDBUTTON = document.getElementById("sendBtn");
const PRIVATEBUTTON = document.getElementById("privateBtn");
let PRIV = false;
const DELETEBUTTON = document.getElementById("deleteBtn");
const RATE = document.getElementsByName("rating")
const TEXTAREA = document.getElementById("cmntText")
const DATETIME = document.getElementById('dateTime')
let NOWTIME;
let NOWDATE;

/* ===========================[Date Time]============================= */

function updateDateTime() {
    const ACTUALDATE = new Date();
    const DAY = ACTUALDATE.getDate();
    const MONTH = ACTUALDATE.getMonth() + 1;
    const YEAR = ACTUALDATE.getFullYear() % 100;
    const HOURS = ACTUALDATE.getHours();
    const MINUTES = ACTUALDATE.getMinutes();

    function formatMinutes(minutes) {
        return minutes < 10 ? `0${minutes}` : minutes;
    }

    const FORMATEDDATE = `${MONTH}/${DAY}/${YEAR}`;
    const FORMATEDHOURS = `${HOURS}:${formatMinutes(MINUTES)}`;

    NOWDATE = FORMATEDDATE;
    NOWTIME = FORMATEDHOURS;

    document.getElementById('dateTime').textContent = `${FORMATEDDATE} ${FORMATEDHOURS}`;
}
updateDateTime();
setInterval(updateDateTime, 1000);

/* =============================[Delete]=============================== */

DELETEBUTTON.addEventListener("click", ()=>{
    TEXTAREA.value = "";
    for (button of RATE){
        button.checked = false;
    }
})

/* ==============================[send]================================ */
function saveOnLocalStorage(){
    let comment = JSON.parse(localStorage.getItem("comment")) || [];

    if (!Array.isArray(comment)) {
        comment = [];
    }

    let newComment = {
        "userName": USERNAME.value,
        "date": NOWDATE,
        "time": NOWTIME,
        "content": TEXTAREA.value,
        "rate": 3
      };

      comment.push(newComment);

      localStorage.setItem("comment", JSON.stringify(comment))
}
SENDBUTTON.addEventListener("click", ()=>{
    saveOnLocalStorage();
    TEXTAREA.value = "";
    for (button of RATE){
        button.checked = false;
    }
})
    
/* ==============================[private]================================ */

PRIVATEBUTTON.addEventListener("click", () => {
    if (PRIV == false){
        PRIV = true;
        USERNAME.innerHTML = "Authorless"; 
        PROFILEIMAGE.setAttribute("src", 'img/img_perfil_private.png');
    } else {
        PRIV = false;
        USERNAME.innerHTML = "User Name"; 
        PROFILEIMAGE.setAttribute("src", 'img/img_perfil.png');
    }
});

/* ==================================================================== */
const CONTAINER = document.getElementById("product-container");
const COMMENTS = document.getElementById("comments");
let currentProduct = {};
let commentaries = [];
function showProduct() {
	let htmlContentToAppend = "";

	document.getElementById("title").innerHTML = `${currentProduct.name} <hr>`;

	htmlContentToAppend = `
    
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
     </div> 

        
        <div class="image-container">

        <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img  src="${currentProduct.images[0]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img  src="${currentProduct.images[1]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img  src="${currentProduct.images[2]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img  src="${currentProduct.images[3]}" class="d-block w-100" alt="...">
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
        </div>
    </div>


    `;
	CONTAINER.innerHTML = htmlContentToAppend;
}

function showComments() {
	let commentsToAppend = "";

	for (let i = 0; i < commentaries.length; i++) {
		commentsToAppend += `
       <div class="comment-box ">
          <div class="d-flex w-100 justify-content-between">
          <div class="d-flex">
            <h6><b>${commentaries[i].user}</b></h6>-
            <span  class="fa fa-star star "></span>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span> 
          </div>
          <small>${commentaries[i].dateTime}</small>
      </div>
            <div class="comment-description">${commentaries[i].description}</div>
        </div>`;
	}

	COMMENTS.innerHTML = commentsToAppend;

	let coment = document.getElementsByClassName("comment-box");
	for (let i = 0; i < coment.length; i++) {
		let star = coment[i].getElementsByClassName("star");
		for (let j = 0; j < commentaries[i].score; j++) {
			star[j].classList.add("checked");
		}
	}
}

document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCT_INFO_URL + localStorage.ProductID + ".json").then(function (resultObj) {
		if (resultObj.status == "ok") {
			currentProduct = resultObj.data;
			showProduct();
		}
	});
	getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.ProductID + ".json").then(function (result) {
		if (result.status == "ok") {
			commentaries = result.data;
			showComments();
		}
	});
});
