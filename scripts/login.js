function login(){
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    console.log(username,password)
    myStorage = window.localStorage;

fetch("https://enigmatic-sierra-22968.herokuapp.com/auth", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            username,
            password
         }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          console.log(res["access_token"]);
          console.log(myStorage);
          myStorage.setItem("jwt-token", res["access_token"]);
          if (res["status_code"] == 401){
            document.querySelector("#error").innerHTML = "Invalid creditials";
            return;
          }
          else{
              
              window.location = "./html/Interface.html"
          }

        });
}

function Register(){
    let first_name = document.querySelector("#name").value
    let surname = document.querySelector("#surname").value
    let email = document.querySelector("#email").value
    let username = document.querySelector("#reg-username").value
    let password = document.querySelector("#reg-password").value


    fetch("https://enigmatic-sierra-22968.herokuapp.com/user-registration/", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ 
            first_name,
            surname,
            username,
            password,
            email,
         }),
      })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            if(res.status_code == 201){
                document.querySelector("#error").innerHTML = "You have successfully registered. Please login to continue"
                setTimeout(function (){
                    window.location = "../index.html"
                }, 3000 )
            }
        });
}
