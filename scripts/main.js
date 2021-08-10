
let username = document.getElementsByName("username")
let password = document.getElementsByName("password")



fetch('https://enigmatic-sierra-22968.herokuapp.com/auth', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"username": "gideon", "password": "1234"})
}).then(res => res.json())
  .then(res => {
            console.log(res);
            myStorage = window.localStorage;
            console.log(res["access_token"]);
            myStorage.setItem("jwt-token", res["access_token"]);
            // 
              fetch('https://enigmatic-sierra-22968.herokuapp.com/show-users/', {
              method: 'get',
              headers: {
                "Authorization": `jwt ${myStorage.getItem("jwt-token")}`,
                "Content-Type": "application/json"
              },
        })
          .then(res => res.json())
          .then(json => console.log(json));
   });