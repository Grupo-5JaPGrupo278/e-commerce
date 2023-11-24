// Funcionalidad de mostrar contraseña en el Login / Cambia el tipo de Input para mostrar texto
let showPassword = document.getElementById("showpassword");
// Se obtienen los campos del formulario de inicio de sesión
const BUTTON = document.getElementById("log-in-btn")
const EMAIL = document.getElementById("email");
const PASSWORD = document.getElementById("floatingPassword");

let logued_in = false // Se declara variable de Logued-In para exportarla al LocalStorage
// Se obtienen los campos del formulario de inicio de sesión

// Funcionalidad de mostrar contraseña en el Login / Cambia el tipo de Input para mostrar texto
showPassword.addEventListener("click", function () {
    if (PASSWORD.type === "password") {
        PASSWORD.type = "text";
    } else {
        PASSWORD.type = "password";
    }
});
// Funcionalidad de mostrar contraseña en el Login / Cambia el tipo de Input para mostrar texto

// Función Submit de los campos de inicio de sesión
BUTTON.addEventListener("click", function (e) {
    let matching = false; // variable que declara la existencia de las credenciales en la base de datos
    let response;
    // Se crea un objeto con las credenciales que utilizó el usuario
    let login_credentials = {
        email: EMAIL.value,
        password: PASSWORD.value
    };
    let optsPOST = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(login_credentials), // Convierte los datos a formato JSON
	}
    // Se hace fetch de la base de datos de credenciales
    fetchWithOpts(CREDENTIALS_URL, optsPOST)
    .then(response => {
        if (response.status === 'ok') {
            return response;
        } else {
            throw new Error('Error en la solicitud' + response.status);
        }
    })
    .then(data => {
        if (data.status === 'ok') {
            response = data.data;
            matching = true;

            localStorage.setItem("token", JSON.stringify(response.datos.token));
            login_credentials = response.datos.userdata;
            console.log(login_credentials);

            // Aquí, dentro del mismo bloque then, puedes realizar las acciones adicionales
            if (matching) {
                logued_in = true;
                localStorage.setItem("IDnum", login_credentials.id);
                localStorage.setItem("loguedIn", true);
                localStorage.setItem("Email", login_credentials.email);
                localStorage.setItem("username", login_credentials.username);
                localStorage.setItem("fullname", login_credentials.fullname);

                setTimeout(function () {
                    top.window.location = "index.html";
                }, 2000);
            } else {
                alert('Sus credenciales no son correctas, pruebe nuevamente');
            }
        } else {
            console.log('An error has occurred');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
});