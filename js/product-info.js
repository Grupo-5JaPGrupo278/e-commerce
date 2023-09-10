
/* ===========================[coments]================================ */
const USERNAME = document.getElementById("cmntUser");
const PROFILEIMAGE = document.getElementById("profileImage")
const SENDBUTTON = document.getElementById("sendBtn");
const PRIVATEBUTTON = document.getElementById("privateBtn");
let PRIV = false;
const DELETEBUTTON = document.getElementById("deleteBtn");
const RATE = document.getElementsByName("rating")
const TEXTAREA = document.getElementById("cmntText")
const DATETIME = document.getElementById('dateTime')
let NOWTIME;
let NOWDATE;

/* ===========================[Date Time]============================= */

function updateDateTime() {
    const ACTUALDATE = new Date();
    const DAY = ACTUALDATE.getDate();
    const MONTH = ACTUALDATE.getMonth() + 1;
    const YEAR = ACTUALDATE.getFullYear() % 100;
    const HOURS = ACTUALDATE.getHours();
    const MINUTES = ACTUALDATE.getMinutes();

    function formatMinutes(minutes) {
        return minutes < 10 ? `0${minutes}` : minutes;
    }

    const FORMATEDDATE = `${MONTH}/${DAY}/${YEAR}`;
    const FORMATEDHOURS = `${HOURS}:${formatMinutes(MINUTES)}`;

    NOWDATE = FORMATEDDATE;
    NOWTIME = FORMATEDHOURS;

    document.getElementById('dateTime').textContent = `${FORMATEDDATE} ${FORMATEDHOURS}`;
}
updateDateTime();
setInterval(updateDateTime, 1000);

/* =============================[Delete]=============================== */

DELETEBUTTON.addEventListener("click", ()=>{
    TEXTAREA.value = "";
    for (button of RATE){
        button.checked = false;
    }
})

/* ==============================[send]================================ */
function saveOnLocalStorage(){
    let comment = JSON.parse(localStorage.getItem("comment")) || [];

    if (!Array.isArray(comment)) {
        comment = [];
    }

    let newComment = {
        "userName": USERNAME.value,
        "date": NOWDATE,
        "time": NOWTIME,
        "content": TEXTAREA.value,
        "rate": 3
      };

      comment.push(newComment);

      localStorage.setItem("comment", JSON.stringify(comment))
}
SENDBUTTON.addEventListener("click", ()=>{
    saveOnLocalStorage();
    TEXTAREA.value = "";
    for (button of RATE){
        button.checked = false;
    }
})
    
/* ==============================[private]================================ */

PRIVATEBUTTON.addEventListener("click", () => {
    if (PRIV == false){
        PRIV = true;
        USERNAME.innerHTML = "Authorless"; 
        PROFILEIMAGE.setAttribute("src", 'img/img_perfil_private.png');
    } else {
        PRIV = false;
        USERNAME.innerHTML = "User Name"; 
        PROFILEIMAGE.setAttribute("src", 'img/img_perfil.png');
    }
});

/* ==================================================================== */