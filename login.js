class Login {
    constructor() {
        this.fetchUserData();
    }

    //hämtar user info från api
    fetchUserData() {
        fetch('https://5da7897d23fa740014697829.mockapi.io/user/', {
            method: "GET"
          })
          .then(response => {
            return response.json()
          })
          .then(data => {
            this.checkLogin(data);
          });
      }

      //loopar igenom users i api, för varje plats i loopen körs signin som kollar om det stämmer överens med userinput
      checkLogin(data) {
        let fel = true;
         for(let i = 0; i < data.length; i++) {
             
             let databaseUserN = data[i].userName;
             let databasePWord = data[i].passWord;
             let userN = document.getElementsByClassName('login')[0].value;
            let pword = document.getElementsByClassName('login')[1].value;
            if(databaseUserN == userN && databasePWord == pword) {
                fel = false;
                alert("Du är inloggad som " + userN);
                window.location.href = "LandingPage/index.html";
                }
            }
            if(fel == true) {
                this.signIn();
            }
        }

        //Körs varje varv i loopen. Loggar in som given användare, måste finnas i api.
        signIn() {
            document.getElementById('error').innerHTML = "Du skrev fel username eller lösenord";
            }
        }



$(document).ready(function () {
    $(".btn").on("click", function(){
        let login = new Login();
    });
});