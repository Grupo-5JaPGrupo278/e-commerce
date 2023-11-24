const CATEGORIES_URL = "http://localhost:3000/categories/";
const PRODUCT_INFO_URL = "http://localhost:3000/categories/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/categories/comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CREDENTIALS_URL = "http://localhost:3000/profile/login";
const SIGNUP_URL = "http://localhost:3000/profile/signup";
const EditProfile_URL = "http://localhost:3000/profile/";
const CARTLIST_URL = "http://localhost:3000/cartlist/";
const URL = "http://localhost:3000/aboutus/"
// Función Fetch personalizada para dar opciones según necesidad de finalidad
const fetchWithOpts = async (url, opts) => {
  let result = {};
  try {
      const response = await fetch(url, opts);
      if (response.ok) {
          const data = await response.json();
          result.status = "ok";
          result.data = data;
      } else {
          throw new Error(response.statusText);
      }
  } catch (error) {
      result.status = "error";
      result.data = error;
  }
  return result;
};


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}
// Función Fetch para hacer las Requests a las Api's
let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
// Función Fetch para hacer las Requests a las Api's