

/////////////////////////////////////////// Data from API////////////////////////////////////////
myStorage = window.localStorage;
urlAuth = "https://enigmatic-sierra-22968.herokuapp.com/auth"
urlsShowUsers = 'https://enigmatic-sierra-22968.herokuapp.com/show-users/'
urlsShowProducts = 'https://enigmatic-sierra-22968.herokuapp.com/show-products/'
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

///////////////////////////////// Products Functionality //////////////////////

let products = []; // Add products to array

function fecthProducts(){
  fetch( urlsShowProducts, {
    method: 'get',
    headers: {
      "Authorization": `jwt ${myStorage.getItem("jwt-token")}`,
      "Content-Type": "application/json"
    },
})
.then(res => res.json())
.then(data => {
  console.log(data)
  products = data.data;
  createdProducts(data.data);
});
}
fecthProducts();

function createdProducts(products){
  let productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = "";
  let i=0;
  products.forEach((product) => {
    productsContainer.innerHTML += `
    <div class="product">
                      <div class="card-image">
                          <img src="${products[i][3]}" alt="${products[i][1]}">
                      </div>
                      <h3 class="title">${products[i][1]}</h3>
                      <d class="buttons">
                          <button class="add-to-cart button" onclick="addToCart(${products[i][0]})">Buy</button>
                          <button class="edit-product button">Edit</button>
                          <button class="delete-product button" onclick="deleteProduct(${products[i][0]})">Delete</button>
                      </d
                  </div>
                   `;
                   i+=1;
  });
}

function deleteProduct(id){
    console.log(products)

    console.log(id) 
    let index=0;
    let deletedProducts = products.find( item => {
      console.log("item",item[0]);
      if( item[0] == id){
        products.splice(index,1);
        createdProducts(products);
      }     
      else{
        index += 1;
      }
    });
  
}



//////////////////////Filters///////////////////
function searchForProducts(){
  let searchItem = document.querySelector("#searchItem").value;
  console.log(searchItem);
 
  let i=0;
  let searchedProducts = products.data.filter((product) =>{
    products.data[i][1].toLowerCase().startsWith(searchItem.toLowerCase())
    i+=1;
  });
  console.log(products.data[i][1]) 
  console.log(searchedProducts);
  createdProducts(searchedProducts)
}

function sortName(){
  let sortedProducts = products.sort((a,b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  });

  createdProducts(sortedProducts);
}

function sortNameDesc() {
  let sortedProducts = products.sort((a,b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  });

  sortedProducts.reverse();
  createdProducts(sortedProducts);

}

function sortPriceAsc(){
  let sortedProducts = products.sort((a, b) => a[4] - b[4]);
  createdProducts(sortedProducts);
}

function sortPriceDesc(){
  let sortedProducts = products.sort((a, b) => a[4] - b[4]).reverse();
  createdProducts(sortedProducts);
}
////////////////////////////////Create Products Functionality ///////////////////////////


//////////////////////////////// Cart Products Funtionality/////////////////////////////
let cart = []; // add products to array
//////////////Display Products ///////////////////
function renderProdctsInCart(cartProducts){
  let cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";

  if (cartProducts.length > 0){
    let i =0;
    cartProducts.map((cartProduct) => {
        cartContainer.innerHTML += `
        <div class="product">
        <div class="card-image">
            <img src="${cartProduct[3]}" alt="${cartProduct[1]}">
        </div>
        <h3 class="title">${cartProduct[1]}</h3>
        <div class="buttons">
            <button class="delete-product button" onclick="deleteFromCart(${cartProduct[0]})">Delete</button>
        </div>
    </div>
        `
        i+=1;
    });

    ////////////// calcutlates total price of products in cart/////////////
    let totalPrice = cartProducts.reduce((total, item) => total + item[4], 0);
    let cartInfo = document.querySelector(".cart-info");
    cartInfo.innerHTML = `
        <h3 class="total">Total Price : ${totalPrice}</h3>

    `;
    
    console.log(totalPrice);

  }
  else{
    cartContainer.innerHTML =  "<h2> No Items in cart </h2>";
  }
}
//////////////////////// Adding and Deleting products in Cart Functions/////////////////
function addToCart(id){
  let i=0;
  let product = products.find(item => {
     if (item[0] == id){
       return item;
     }
  });
  
  console.log(product);
  cart.push(product);
  console.log("Items in Cart :", cart);
  renderProdctsInCart(cart);
}

function deleteFromCart(id){
  console.log(id) 
  let index = 0;
  let product = cart.find( item => {
    if (item[0] == id){
      console.log(index)
      cart.splice(index,1);
      console.log(cart)
      renderProdctsInCart(cart);
    }
    else{
      index +=1;
    }
  });
}
////////////////////////////End Of Cart Products Functionality////////////////////


/////////////////////////////////Profile Functionality //////////////////////////
users = []

function fetchProfiles(){
  fetch( urlsShowUsers ,{
    method: 'get',
    headers: {
      "Authorization": `jwt ${myStorage.getItem("jwt-token")}`,
      "Content-Type": "application/json"
    },
})
.then(res => res.json())
.then(data => {
  console.log(data)
  users = data;
  createProfile(data.data);
});
}
fetchProfiles();

function createProfile(profiles){
  let i = 0;
    let profilesContainer = document.querySelector("#profile");
    profilesContainer.innerHTML ="";
    profiles.forEach( profile => {
      profilesContainer.innerHTML += `
          <div class="profiles-container">
              <div class="fullnames">
                  <span class="name">${profiles[i][1]}</span>
                  <span class="surname">${profiles[i][2]}</span>
              </div>
              <div class="login-details">
                  <span class="login-detail username">${profiles[i][3]}</span>
                  <span class="login-details password">${profiles[i][4]}</span>
              </div>
              <span class="email">${profiles[i][5]}</span>
        </div>
        <div class="buttons button">
          <button class="button" onclick="updateUser()">Update</button>
          <button class="button" onclick="deleteUser()">Delete</button> 
        </div>
      `;
      i += 1;
    });
}

function showContent(contentName) {
  // Remove active from all classes
  let content = document.getElementsByClassName("content");
  for (let i = 0; i < content.length; i++) {
    content[i].classList.remove("active");
  }
  // Add active to specified Element
  let selectedContent = document.getElementById(contentName);
  selectedContent.classList.add("active");
}

function deleteProfile(){

}