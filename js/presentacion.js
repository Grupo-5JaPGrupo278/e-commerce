const button = document.getElementById("btn-presentacion");
const displaydestacados = document.getElementById("display-principal");

button.addEventListener("click",function(e){
    displaydestacados.style.display = "block";
})