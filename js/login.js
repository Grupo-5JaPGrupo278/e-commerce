var mostrarContraseña = document.getElementById("mostrarContraseña");
var contraseña = document.getElementById("floatingPassword");

mostrarContraseña.addEventListener("click", function() {
    if (contraseña.type === "password") {
        contraseña.type = "text";
    } else {
        contraseña.type = "password";
    }
  });

let logued_in = false
const BUTTON = document.getElementById("log-in-btn")
const EMAIL_COOKIE = document.cookie
    .split("; ")
    .find(row => row.startsWith("EMAIL_BASE"))
    .split("=")[1];

    const PASSWORD_COOKIE = document.cookie
    .split("; ")
    .find(row => row.startsWith("PASSWORD_BASE"))
    .split("=")[1];
    // Se les otorga a las cookies variables constantes para manipularlas
    let EMAIL_BASE = "";
    let PASSWORD_BASE = "";
    
button.addEventListener("click",function(e){
    try{
        EMAIL_BASE = JSON.parse(EMAIL_COOKIE);
        PASSWORD_BASE = JSON.parse(PASSWORD_BASE);
    } catch {
        alert("Sus credenciales no son correctas")
    }
    const EMAIL = document.getElementById("email");
    const PASSWORD = document.getElementById("floatingPassword");
    // Comprueba que los campos no esten vacios & Busca en los arrays matcheos de Email y Contraseña
    if((EMAIL.value.length > 0) && (PASSWORD.value.length >= 6)){
        for(let i = 0; i < EMAIL_BASE.length; i++){
            if(EMAIL_BASE[i].email_usuario == EMAIL.value){                
                if((EMAIL_BASE[i].email_id == PASSWORD_BASE[i].email_id)&&(PASSWORD_BASE[i].contrasena == PASSWORD.value )){
                    console.log(`${EMAIL.value} ha iniciado sesión con exito`);
                    logued_in = true;
                    console.log("Estado del Log-In: ", logued_in);
                    document.cookie = `logued_in=${true}; path=/`
                    setTimeout(function(){
                        top.window.location = "index.html"},2000);
                } else {
                    alert("Lo sentimos, pero sus credenciales no son correctas");
                }
            } else {
                alert("Su email no coincide con nuestras bases de datos");
            }
        }
    } else {
        alert("Debe llenar los campos para iniciar sesión");
    }
})
/*button.addEventListener("click",function(e){
    logued_in = true
    console.log("la variable ha cambiado", logued_in)
    document.cookie = `logued_in=${true}; path=/`
})
const nombres_cookie = document.cookie
    .split("; ")
    .find(row => row.startsWith("basenombres"))
    .split("=")[1];

    const pw_cookie = document.cookie
    .split("; ")
    .find(row => row.startsWith("basepw"))
    .split("=")[1];
    // Se les otorga a las cookies variables constantes para manipularlas
    const basenombres = JSON.parse(nombres_cookie);
    const basepw = JSON.parse(pw_cookie);*/