

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

let products = [];
let cart = [];

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
  products = data;
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
                          <img src="${products[i][3]}" alt="">
                      </div>
                      <h3 class="title">${products[i][1]}</h3>
                      <div class="buttons">
                          <button class="add-to-cart button" onclick="addToCart(${products[i][0]})">Buy</button>
                          <button class="edit-product button">Edit</button>
                          <button class="delete-product button">Delete</button>
                      </div>
                  </div>
                   `;
                   i+=1;
  });
}

function addToCart(id){
  let i=0;
  let product = products.data.find(item => {
    console.log(item)
    return item[id]= id ; 
  });
  
  console.log(products);
  cart.push(product);
  console.log(cart);
}

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
    let profilesContainer = document.querySelector("#profile");
    profilesContainer.innerHTML ="";
    profiles.forEach( profile => {
      profilesContainer.innerHTML += `
          <div class="profiles-container">
              <div class="fullnames">
                  <span class="name"></span>
                  <span class="surname"></span>
              </div>
              <div class="login-details">
                  <span class="login-detail username"></span>
                  <span class="login-details password"></span>
              </div>
              <span class="email"></span>
        </div>
        <div class="buttons button">
          <button class="button">Update</button>
          <button class="button">Delete</button> 
        </div>
      `;
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