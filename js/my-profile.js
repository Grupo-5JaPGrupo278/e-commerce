const editarBtn = document.getElementById("editarBtn");
const guardarBtn = document.getElementById("guardarBtn");
const telefonoInput = document.querySelector('input[name="telefono_de_contacto"]');
const nombre_usuario = document.querySelector('input[name="nombre_usuario"]');
const primer_nombre = document.querySelector('input[name="primer_nombre"]');
const segundo_nombre = document.querySelector('input[name="segundo_nombre"]');
const primer_apellido = document.querySelector('input[name="primer_apellido"]');
const email = document.querySelector('input[name="email"]');
const descripcionTextarea = document.getElementById('description');



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






guardarBtn.addEventListener('click', function() {
  //username
  const nuevoNombreUsuario = nombre_usuario.value;
  if (nuevoNombreUsuario.trim() !== '') {
    localStorage.setItem('username', nuevoNombreUsuario);
  } else {
    alert('Por favor, ingresa un nombre de usuario válido.');
  };


  //email
  const nuevoEmail = email.value;
  if (nuevoEmail.trim() !== '') {
    localStorage.setItem('Email', nuevoEmail);
  } else {
    alert('Por favor, ingresa un Email válido.');
  }

  const aboutMeText = descripcionTextarea.value;
  localStorage.setItem('aboutme', aboutMeText);


    const telefonoDeContacto = telefonoInput.value;

  localStorage.setItem('telefono_contacto', telefonoDeContacto);

});

window.addEventListener('load', function() {
  const aboutMeText = localStorage.getItem('aboutme');
  if (aboutMeText) {
    descripcionTextarea.value = aboutMeText;
  }

  const telefonoDeContacto = localStorage.getItem('telefono_contacto');
  if (telefonoDeContacto) {
    telefonoInput.value = telefonoDeContacto;
  }
});