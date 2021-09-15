/////////////////////////////////////////// Data from API////////////////////////////////////////
myStorage = window.localStorage;
urlsShowUsers = "https://enigmatic-sierra-22968.herokuapp.com/show-users/";
urlsShowProducts =
  "https://enigmatic-sierra-22968.herokuapp.com/show-products/";
urlEditProduct = "https://enigmatic-sierra-22968.herokuapp.com/edit-product/"; //add number next to it
urlDeleteProduct =
  "https://enigmatic-sierra-22968.herokuapp.com/delete-product/"; //add number next to it
urlAddProduct = "https://enigmatic-sierra-22968.herokuapp.com/add-product/";
urlShowTyp = "https://enigmatic-sierra-22968.herokuapp.com/"; // add category


function validationLogin(){
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  console.log(username);
  
  if(username.value.trim() == "" )
  {
    username.style.border = "solid 3px red";
    return false
  }
  else if(password.value.trim() == "")
  {
    return false
  }
  else{
    return true
  }
}

function validationRegistration(){
  let names = document.getElementById("name").value
  let surname = document.getElementById("surname").value
  let email = document.getElementById("email").value
  let regUsername = document.getElementById("reg-username").value
  let regPassword = document.getElementById("reg-password").value
  let confPassword = document.getElementById("confirm-password").value
  if (names.trim() == "" ||
      surname.trim() == "" ||
      username.trim() == ""||
      password.trim() == ""||
      email.trim() == "" ||
      regUsername.trim() == ""||
      regPassword.trim() == ""||
      confPassword.trim() == ""
  )
  {
    alert("Please full in all inputs")
    return false
  }
  else if(confPassword.trim()!=regPassword.trim()){
    alert("Confirmed password doesn't match password");
      return false
  }
  else{
    regUser = {
      names : names.trim(),
      surname: surname.trim(),
      email: email.trim(),
      password: password.trim(),
      confPassword:confPassword.trim()
    }
    return  true
  }
}
///////////////////////////////// Products Functionality //////////////////////

let products = []; // Add products to array

function fecthProducts() {
  fetch(urlsShowProducts, {
    method: "get",
    headers: {
      Authorization: `jwt ${myStorage.getItem("jwt-token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products = data.data;
      createdProducts(data.data);
    });
}
fecthProducts();

function createdProducts(products) {
  let productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    productsContainer.innerHTML += `
    <div class="product">
                      <div class="card-image">
                          <img src="${product[3]}" alt="${product[1]}">
                      </div>
                      <h3 class="title">${product[1]}</h3>
                      <d class="buttons">
                          <button class="add-to-cart button" onclick="addToCart(${product[0]})">Buy</button>
                          <button class="update-product button" onclick="updateProduct(${product[0]})">Update</button>
                          <button class="delete-product button" onclick="deleteProduct(${product[0]})">Delete</button>
                      </d
                  </div>
                   `;
  });
}
//////////////////// delete products functionality///////////
function deleteProduct(id) {
  console.log(products);

  console.log(id);
  let index = 0;
  let deletedProducts = products.find((item) => {
    console.log("item", item[0]);
    if (item[0] == id) {
      products.splice(index, 1);

      createdProducts(products);
    } else {
      index += 1;
    }
  });
}

//////////Update Products Functionality////

let updateProducts = document.querySelector("#update-product");
updateProducts.innerHTML = "";

function updateProduct(id) {
  product = products[id - 1];
  updateProducts.innerHTML = `                        
    <form onsubmit="event.preventDefault();" id="update-products" class="forms" method="POST">
        <h2 class="heading">Update Product</h2>
        <input class="input" type="text" name="update-product-name" id="update-product-name" required placeholder="product name" value="${product[1]}">
        <input class="input" type="text" name="update-product-description" id="update-product-description" required placeholder="product description" value="${product[2]}">
        <input class="input" type="text" name="update-product-price" id="update-product-price" required placeholder="product price" value="R ${product[4]}">
        <input class="input" type="text" name="update-product-type" id="update-product-type" required placeholder="product type" value="${product[5]}">
        <input type="file" id="image" name="update-image" accept="image/png">
        <input class = "button" type="submit" name="submit" type="submit" value="confirm">
</form>
    `;
  productsForm.style.backgroundColor = "aqua";


}

// function updateProducts(){
//   let getUpdatedTitle = document.getElementById("update-product-name").value;

//   fetch(urlEditProduct,{
//     method: "put",
//     headers: {
//       "Authorization": `jwt ${myStorage.getItem("jwt-token")}`,
//       "Content-Type": "application/json"
//     },
//     body: {
//       "title": `${getUpdatedTitle}`,
//       // "description": `${}`
//     }
//   })

// }

//////////////////////Filters///////////////////
function searchForProducts() {
  let searchItem = document.querySelector("#searchItem").value;
  console.log(searchItem);

  let i = 0;
  let searchedProducts = products.data.filter((product) => {
    products[1].toLowerCase().startsWith(searchItem.toLowerCase());
    i += 1;
  });
  console.log(products.data[i][1]);
  console.log(searchedProducts);
  createdProducts(searchedProducts);
}

function sortName() {
  let sortedProducts = products.sort((a, b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  });

  createdProducts(sortedProducts);
}

function sortNameDesc() {
  let sortedProducts = products.sort((a, b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  });

  sortedProducts.reverse();
  createdProducts(sortedProducts);
}

function sortPriceAsc() {
  let sortedProducts = products.sort((a, b) => a[4] - b[4]);
  createdProducts(sortedProducts);
}

function sortPriceDesc() {
  let sortedProducts = products.sort((a, b) => a[4] - b[4]).reverse();
  createdProducts(sortedProducts);
}
////////////////////////////////Create Products Functionality ///////////////////////////

productsForm = document.querySelector(".create-container");
productsForm.innerHTML = "";

function formCreated() {
  productsForm.innerHTML = `
  <form onsubmit="event.preventDefault()" id="create-products" class="forms" method="POST">
    <h2 class="heading">Create Product</h2>
    <input class="input" type="text" name="product-name" id="product-name" required placeholder="product name">
    <input class="input" type="textarea" name="product-description" id="product-description" required placeholder="product description">
    <input class="input" type="text" name="product-price" id="product-price" required placeholder="product price">
    <input class="input" type="text" name="product-type" id="product-type" required placeholder="product type">
    <input type="file" id="image" name="image" accept="image/png">
    <input class = "button" type="submit" name="submit" type="submit" value="register">
</form>
  `;

  return productsForm;
}
formCreated();

//////////////////////////////// Cart Products Funtionality/////////////////////////////
let cart = []; // add products to array
let totalPrice = 0;

//////////////Display Products ///////////////////
function renderProdctsInCart(cartProducts) {
  let cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";

  if (cartProducts.length > 0) {
    
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
        `;
     
    });

    ////////////// calcutlates total price of products in cart/////////////
    totalPrice = cartProducts.reduce((total, item) => total + item[4], 0);
    let cartInfo = document.querySelector(".cart-info");
    cartInfo.innerHTML = `
        <h3 class="total">Total Price : ${totalPrice}</h3>

    `;

    console.log(totalPrice);
  } else {
    cartContainer.innerHTML = "<h2> No Items in cart </h2>";
  }
}
//////////////////////// Adding and Deleting products in Cart Functions/////////////////
function addToCart(id) {
  let i = 0;
  let product = products.find((item) => {
    if (item[0] == id) {
      return item;
    }
  });

  console.log(product);
  cart.push(product);
  console.log("Items in Cart :", cart);
  renderProdctsInCart(cart);
}

function deleteFromCart(id) {
  console.log(id);
  let index = 0;
  let product = cart.find((item) => {
    if (item[0] == id) {
      console.log(index);
      cart.splice(index, 1);
      totalPrice = totalPrice - item[4];
      console.log(cart.length);
      renderProdctsInCart(cart);
    } else {
      index += 1;
    }
  });

  console.log(product);
}
////////////////////////////End Of Cart Products Functionality////////////////////

/////////////////////////////////Profile Functionality //////////////////////////
users = [];

function fetchProfiles() {
  fetch(urlsShowUsers, {
    method: "get",
    headers: {
      Authorization: `jwt ${myStorage.getItem("jwt-token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      users = data.data;
      createProfile(users)
    });
}
fetchProfiles();

function createProfile(users) {
  let i = 0;
  let profilesContainer = document.querySelector("#profile");
  profilesContainer.innerHTML = "";
  users.forEach((profile) => {
    profilesContainer.innerHTML += `
          <div class="profiles-container">
              <div class="fullnames">
                  <span class="name">${profile[1]}</span>
                  <span class="surname">${profile[2]}</span>
              </div>
              <div class="login-details">
                  <span class="login-detail username">${profile[3]}</span>
                  <span class="login-details password">${profile[4]}</span>
              </div>
              <span class="email">${profile[5]}</span>
        </div>
        <div class="buttons button">
          <button class="button" onclick="updateUser()">Update</button>
          <button class="button" onclick="deleteUser()">Delete</button> 
        </div>
      `;
    i += 1;
  });
}

function deleteProfile() {}

//////////////////////////ADDITIONAL FUNCTIONS////////////////////////
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

