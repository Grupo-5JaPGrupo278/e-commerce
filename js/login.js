var mostrarContraseña = document.getElementById("mostrarContraseña");
var contraseña = document.getElementById("floatingPassword");

mostrarContraseña.addEventListener("click", function() {
    if (contraseña.type === "password") {
        contraseña.type = "text";
    } else {
        contraseña.type = "password";
    }
  });