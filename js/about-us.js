const HOMEBTN = document.getElementById("homeBtn");
const PERSON1BTN = document.getElementById("person1");
const PERSON2BTN = document.getElementById("person2");
const PERSON3BTN = document.getElementById("person3");
const PERSON4BTN = document.getElementById("person4");
const PERSON5BTN = document.getElementById("person5");
const PERSON6BTN = document.getElementById("person6");
const PERSON7BTN = document.getElementById("person7");
const PERSONIMAGE = document.getElementById("personImage");
const INFOCONTAINER = document.getElementById("aboutUsInfoContainer");
const NAMETITLE = document.getElementById("nameH1Title");
const PRESENTATIONPARAGRAPH = document.getElementById("presentationAUP");
const EXPERIENCETITLE = document.getElementById("experienceH2Title");
const STUDIESLIST = document.getElementById("studiesAUP");
const EXPERIENCEPARAGRAPH = document.getElementById("experienceAUP");
const URL = 'json/about-us.json';
let DATOSABOUTUS = [];

fetch(URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    DATOSABOUTUS = data.integrantes;
    console.log(DATOSABOUTUS);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

function displayData(name){
    for(element of DATOSABOUTUS){
        if(element.nombre === name){
            return element;
        }
    }
}

function displayPerson(name, imageURL){
    PERSONIMAGE.style.opacity = 0;
        INFOCONTAINER.style.opacity = 0;
        setTimeout(() => {
            NAMETITLE.textContent = displayData(name).nombre;
            while (STUDIESLIST.firstChild) {
                STUDIESLIST.removeChild(STUDIESLIST.firstChild);
            }
            PRESENTATIONPARAGRAPH.textContent = displayData(name).descripcion;
            EXPERIENCEPARAGRAPH.textContent = displayData(name).experiencia;
            for (element of displayData(name).estudios){
                const listItem = document.createElement("li");
                listItem.textContent = element;
                STUDIESLIST.appendChild(listItem);
            }
            PERSONIMAGE.src = imageURL;
            PERSONIMAGE.style.opacity = 1;
            INFOCONTAINER.style.opacity = 1;
        }, 500);
}

document.addEventListener("DOMContentLoaded", ()=>{
    PERSONIMAGE.style.opacity = 0;
    INFOCONTAINER.style.opacity = 0;
})

HOMEBTN.addEventListener("change", () => {
    if (HOMEBTN.checked) {
        PERSONIMAGE.style.opacity = 0;
        INFOCONTAINER.style.opacity = 0;
    }
});
PERSON1BTN.addEventListener("change", () => {
    if (PERSON1BTN.checked) {
        displayPerson("Axel Palombo", "img/about-us-apalombo.png")
    }
});
PERSON2BTN.addEventListener("change", () => {
    if (PERSON2BTN.checked) {
        displayPerson("Bruno Mendez", "img/about-us-bmendez.png")
    }
});
PERSON3BTN.addEventListener("change", () => {
    if (PERSON3BTN.checked) {
        displayPerson("Bruno Moreira", "img/about-us-bmoreira.png")
    }
});
PERSON4BTN.addEventListener("change", () => {
    if (PERSON4BTN.checked) {
        displayPerson("Franco Echaide", "img/about-us-fechaide.png")
    }
});
PERSON5BTN.addEventListener("change", () => {
    if (PERSON5BTN.checked) {
        displayPerson("German Kroger", "img/about-us-gkroger.png")
    }
});
PERSON6BTN.addEventListener("change", () => {
    if (PERSON6BTN.checked) {
        displayPerson("Ivan Pereira", "img/about-us-ipereira.png")
    }
});
PERSON7BTN.addEventListener("change", () => {
    if (PERSON7BTN.checked) {
        displayPerson("Rocio De Brun", "img/about-us-rdebrun.png")
    }
});