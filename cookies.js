const nombres_cookie = document.cookie
  .split("; ")
  .find(row => row.startsWith("basenombres"))
  .split("=")[1];

const pw_cookie = document.cookie
  .split("; ")
  .find(row => row.startsWith("basepw"))
  .split("=")[1];

const basenombres = JSON.parse(nombres_cookie);
const basepw = JSON.parse(pw_cookie);
const button = document.getElementById("libtn");
button.addEventListener("click",function(e){
   
const nombre = document.getElementById("name");
const pass1 = document.getElementById("pw1");

    if((nombre.value.length > 0) && (pass1.value.length >= 6)){
        for(let i = 0; i < basenombres.length; i++){
            if(basenombres[i].nombre_de_usuario == nombre.value){
                if((basenombres[i].numero_id == basepw[i].numero_id)&&(basepw[i].contrasena == pass1.value )){
                    console.log("Usted ha iniciado sesión con exito")
                } else {
                    console.log("Lo sentimos, pero sus credenciales no son correctas")
                }
            } else {
                console.log("Su nombre de usuario no coincide con nuestras bases de datos")
            }
        }
    } else {
        console.log("Debe llenar los campos para iniciar sesión")
    }
})

