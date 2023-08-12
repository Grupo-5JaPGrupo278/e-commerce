// Leer cookies
let logued_in = false
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Obtener datos almacenados en cookies

document.addEventListener("DOMContentLoaded",function(e){
    // Obtener datos almacenados en cookies
    const storedlogued_in = getCookie("logued_in");
    if (storedlogued_in){
        console.log(storedlogued_in)
    } else {
        console.log("No ha cargado la cookie")
    }

    logued_in = storedlogued_in
    
    if (!(logued_in == "true")){
        setTimeout(function(){
            window.location = "login.html"}, 4000)
    }
})