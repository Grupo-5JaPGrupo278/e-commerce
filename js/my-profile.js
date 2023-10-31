const editarBtn = document.getElementById("editarBtn");
const guardarBtn = document.getElementById("guardarBtn");
const telefonoInput = document.querySelector('input[name="telefono_de_contacto"]');
const nombre_usuario = document.querySelector('input[name="nombre_usuario"]');
const primer_nombre = document.querySelector('input[name="primer_nombre"]');
const segundo_nombre = document.querySelector('input[name="segundo_nombre"]');
const primer_apellido = document.querySelector('input[name="primer_apellido"]');
const email = document.querySelector('input[name="email"]');


  editarBtn.addEventListener("click", function() {
    telefonoInput.removeAttribute("disabled");
    nombre_usuario.removeAttribute("disabled");
    primer_nombre.removeAttribute("disabled");
    segundo_nombre.removeAttribute("disabled");
    primer_apellido.removeAttribute("disabled");
    email.removeAttribute("disabled");

  });

  guardarBtn.addEventListener("click", function() {
    telefonoInput.setAttribute("disabled", "disabled");
    nombre_usuario.setAttribute("disabled", "disabled");
    primer_nombre.setAttribute("disabled", "disabled");
    segundo_nombre.setAttribute("disabled", "disabled");
    primer_apellido.setAttribute("disabled", "disabled");
    email.setAttribute("disabled", "disabled");

});

const username = localStorage.getItem("username");

if (username !== null) {
    nombre_usuario.value = username;
}

const Fullname = localStorage.getItem("fullname");

if (Fullname !== null) {
  const palabras = Fullname.split(" ");
  
  if (palabras.length >= 1) {
    primer_nombre.value = palabras[0];
  }
  
  if (palabras.length >= 2) {
    primer_apellido.value = palabras[1];
  }
}

const Email = localStorage.getItem("Email");

if (Email !== null) {
    email.value = Email;
}

const fullname = localStorage.getItem("fullname");

if (fullname !== null) {
  const nombrecompleto = document.getElementById("fullname");
  nombrecompleto.textContent = fullname;
}