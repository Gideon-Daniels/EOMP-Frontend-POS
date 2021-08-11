/////////////////////////////////////////// Creating HTML templates /////////////////////////////


function createdProduct(product){
  let createdProduct = `
  <div class="product">
                    <div class="card-image">
                        <img src="" alt="">
                    </div>
                    <h3 class="title"></h3>
                    <div class="buttons">
                        <button class="add-to-cart button">Buy</button>
                        <button class="edit-product button">Edit</button>
                        <button class="delete-product button">Delete</button>
                    </div>
                </div>
                 `
}
function  renderProducts(){
  let productContainer = document.querySelector(".products-container") 
};

/////////////////////////////////////////// Data from API////////////////////////////////////////
myStorage = window.localStorage;
urlAuth = "https://enigmatic-sierra-22968.herokuapp.com/auth"
urlsShowProducts = 'https://enigmatic-sierra-22968.herokuapp.com/show-users/'
urlEditProduct = 'https://enigmatic-sierra-22968.herokuapp.com/edit-product/'//add number next to it
urlDeleteProduct = 'https://enigmatic-sierra-22968.herokuapp.com/delete-product/' //add number next to it
urlAddProduct = "https://enigmatic-sierra-22968.herokuapp.com/add-product/"
urlShowTyp = "https://enigmatic-sierra-22968.herokuapp.com/" // add category
let username = document.getElementsByName("username")
let password = document.getElementsByName("password")

function authorization(username,password){
  fetch(urlAuth, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": "gideon", "password": "1234"})
  }).then(res => res.json())
    .then(res => {
              console.log(res);
              
              console.log(res["access_token"]);
              console.log(myStorage)
              myStorage.setItem("jwt-token", res["access_token"]);
     });
}

authorization();

function fecthProducts(){
  fetch( urlsShowProducts, {
    method: 'get',
    headers: {
      "Authorization": `jwt ${myStorage.getItem("jwt-token")}`,
      "Content-Type": "application/json"
    },
})
.then(res => res.json())
.then(json => console.log(json));
}
fecthProducts();