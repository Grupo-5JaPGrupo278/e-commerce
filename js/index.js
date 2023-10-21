const DARKMODE = document.getElementById('toggle');

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("cars").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("toys").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("furniture").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});
const button = document.getElementById("btn-presentation");
const displaydestacados = document.getElementById("main-display");

button.addEventListener("click",function(e){
    displaydestacados.style.display = "block";
    this.classList.add("fade-out")
    setTimeout(() => {
        this.classList.add("displayNone")
    }, 1000);
})

document.addEventListener("DOMContentLoaded", function() {
    const closeButton = document.getElementById("button-close");
    const noMostrarCheckbox = document.getElementById("no-mostrar");

    // Función para cerrar el popup
    function closePopup() {
        termsPopup.style.display = "none";

        // Guardar la preferencia del usuario si marca "No volver a mostrar"
        if (noMostrarCheckbox.checked) {
            document.cookie = "mostrarPopup=0; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        }
    }

    // Mostrar el popup si la cookie 'mostrarPopup' no está configurada
    if (document.cookie.indexOf("mostrarPopup=0") === -1) {
        termsPopup.style.display = "block";
    }

    // Cerrar el popup al hacer clic en el botón "Cerrar"
    closeButton.addEventListener("click", closePopup);
});
DARKMODE.addEventListener('change', (e)=>{
    const DARKMODE = document.getElementById('toggle');
    if(DARKMODE.checked){
        /* aqui van los estilos del modo claro */
        localStorage.setItem('theme', "light");
        root.style.setProperty('--coloroscuro', '#b5b5db');
        root.style.setProperty('--backgroundimage', 'url("../img/bg_img_light.webp")');       
    }else{
        localStorage.setItem('theme', "dark");
        root.style.setProperty('--coloroscuro', '#22222B');
        root.style.setProperty('--backgroundimage', 'url("../img/bg_img.webp")');
      
    }  
})

document.addEventListener("DOMContentLoaded", ()=>{
    let theme = localStorage.getItem('theme');
    if (theme == "light") {
        DARKMODE.checked = true;
    } else if (theme == "dark") {
        DARKMODE.checked = false;
    }
})
