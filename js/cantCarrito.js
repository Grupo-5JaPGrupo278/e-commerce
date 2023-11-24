const COUNT_CART = document.getElementById("CountCart");
let ArrayCart;

let optsGET = {
	method: "GET",
	mode: "cors",
	headers: {
		"Content-Type": "application/json",
		"access-token": JSON.parse(localStorage.getItem("token")),
	},
}
document.addEventListener("DOMContentLoaded", function () {
	fetchWithOpts(CARTLIST_URL, optsGET).then( (data) => {
		if (data.status === 'ok'){
		  ArrayCart = data.data;
		}
	  }).then( () => {
		COUNT_CART.innerHTML = ArrayCart.length;
	});
});
