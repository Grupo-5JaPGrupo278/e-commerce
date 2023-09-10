
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
