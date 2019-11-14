//Klass som hämtar data från mockAPI, skapar element och skriver ut listan i den.
//Beroende på parameter så sorterar den antingen utifrån namn eller ID.
class CustomerDataHandeler {
  constructor(sortBy) {
    this.fetchData();
    this.sortBy = sortBy;
    this.textinputs;
    this.empty;
    this.nmrOfPrints = 10;
  }

  //Metoden som hämtar data från api.
  fetchData() {
    fetch('https://5da7897d23fa740014697829.mockapi.io/customer/', {
        method: "GET"
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.checkIfSort(data);
      });
  }

  //Metod som sorterar efter egenskap i objektet, default är id.
  checkIfSort(data) {
    if (this.sortBy == "nameAsc") {
      data.sort((compareItem1, compareItem2) => compareItem1.companyName.localeCompare(compareItem2.companyName));
    } else if (this.sortBy == "nameDesc") {
      data.sort((compareItem1, compareItem2) => compareItem2.companyName.localeCompare(compareItem1.companyName));
    }else if (this.sortBy == "idAsc") {
      data.sort((compareItem1, compareItem2) => compareItem1.id.localeCompare(compareItem2.id));
    }  else if (this.sortBy == "idDesc") {
      data.sort((compareItem1, compareItem2) => compareItem2.id.localeCompare(compareItem1.id));
    }
    //Anropar metoden som skriver ut kunderna med en sorterad lista.
    this.displayAllCustomers(data);
  }

  displayAllCustomers(json) {
    //variabelnamn gör det lättare att läsa.
    let allCustomers = json;
    let box = document.getElementsByClassName('allCustomers')[0];
    var allcheckboxes = [];

    //rensar alla elementen i box
    while (box.firstChild) {
      box.removeChild(box.firstChild);
    }

    //Ifall jag vill använda this i jquery
    let _this = this;

    //Här skrivs arrayen ut genom att skapa element som får egenskaperna från objekten.
    //Om "databasen" skulle bli få nya kunder så skulle loopen känna det och skapa nya element med respektve egenskaper.
    for (let i = 0; i < json.length; i++) {

      //Sätter upp hur elementen som appendas ska ligga i varandra
      var row = document.createElement('div');
      row.id = "row";

      var chkBox = document.createElement('input');
      chkBox.type = "checkbox";
      chkBox.name = "chBox";
      chkBox.setAttribute("id", "toggle" + i);
      allcheckboxes.push(row);

      var idBox = document.createElement('div');
      idBox.id = "idBox";
      idBox.innerHTML = allCustomers[i].id;

      var nameBox = document.createElement('div');
      nameBox.id = "nameBox"
      nameBox.innerHTML = allCustomers[i].companyName;;

      let icon = document.createElement('div');
      icon.innerHTML = '<a href="../visaKundKort/visaKundKort.html"> <i class="fa fa-user fa-fw">Kort</i></a>';
      icon.id = "icon";

      //en rad får element som sedan boxen appendar.
      row.appendChild(chkBox);
      row.appendChild(idBox);
      row.appendChild(nameBox);
      row.appendChild(icon);
      box.appendChild(row);

      var checkbox = document.querySelector("#toggle" + i);
      var checkboxes = document.getElementsByName('chBox');

      //Variabelnamn för olika delar av footern
      let moreBtn = document.getElementsByClassName('moreBtn')[0];
      let papperskorg = document.getElementsByClassName('papperskorg')[0];

      //Gör något om vi klickar på en checkbox
      $(checkbox).on("click", function () {
        // Försök att få checkboxes att toggla fram papperskorgen sålänge någon checkbox är icheckad
        _this.textinputs = document.querySelectorAll('input[type=checkbox]');
        _this.empty = [].filter.call(_this.textinputs, function (el) {
          return !el.checked;
        });
        if (_this.textinputs.length == _this.empty.length) {
          moreBtn.classList.remove("hidden");
          papperskorg.classList.add("hidden");;
        }
        for (let y = 0; y < checkboxes.length; y++) {
          if (checkboxes[y].checked == true) {
            moreBtn.classList.add("hidden");
            papperskorg.classList.remove("hidden");
          }
        }
      }); //end eventlistener
    } //end loop

    
    //Efter ett tryck på papperskorgen, ta bort checkade rader och visa mer-knappen igen.
    $("#trash").on("click", function () {
    let moreToggle = document.getElementsByClassName('toggled')[0];
    let trashToggle = document.getElementsByClassName('toggled')[1];
      moreToggle.classList.toggle("hidden");
      trashToggle.classList.toggle("hidden");
      for (let i = 0; i < checkboxes.length; i++) {
        //Här skulle ett metodanrop till en delefunktion kunna vara
        if (checkboxes[i].checked == true) {
          allcheckboxes[i].style.display = "none";
        }
      }
    }); //End eventlistener
  } // end method
} //end class

//when the dom is loaded
$(document).ready(function () {
  console.log("dom ready");
  let customerData = new CustomerDataHandeler();
  let nameCounter = 0;
  let idCounter = 0;

  //sortera efter parameter och ändra ikoner baserat på sortering
  $("#sortByName").on("click", function () {
    if(nameCounter == 0) {
      console.log("sort asc");
      let sortBy = "nameAsc";
      let customerData = new CustomerDataHandeler(sortBy);
      idCounter = 0;
      nameCounter = 1;
      document.getElementById("sortByID").classList = "fa fa-sort-amount-asc";
      document.getElementById("sortByName").classList = "fa fa-sort-amount-desc";
    }
    else if(nameCounter == 1) {
      console.log("sort desc");
      let sortBy = "nameDesc";
      let customerData = new CustomerDataHandeler(sortBy);
      nameCounter = 0;
      idCounter = 0;
      document.getElementById("sortByID").classList = "fa fa-sort-amount-asc";
      document.getElementById("sortByName").classList = "fa fa-sort-amount-asc";
    }
  });
  $("#sortByID").on("click", function () {
    if(idCounter == 0) {
      let sortBy = "idAsc";
      let customerData = new CustomerDataHandeler(sortBy);
      idCounter = 1;
      nameCounter = 0;
      document.getElementById("sortByID").classList = "fa fa-sort-amount-desc";
      document.getElementById("sortByName").classList = "fa fa-sort-amount-asc";
    }else if(idCounter == 1) {
      let sortBy = "idDesc";
      let costomerData = new CustomerDataHandeler(sortBy);
      idCounter = 0;
      nameCounter = 0;
      document.getElementById("sortByName").classList = "fa fa-sort-amount-asc";
      document.getElementById("sortByID").classList = "fa fa-sort-amount-asc";
    }
    
  });
}); //event end



/* en metod som lägger till data i api, används ej
  addData() {
    (async () => {
      const rawResponse = await fetch('http://5da7897d23fa740014697829.mockapi.io/customer/76', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //body: JSON.stringify({id: "1", firstName: "Jonas", lastName: "Gertz", avatar: "https://media.licdn.com/dms/image/C4D03AQFBQU8o1qhqCg/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=YurKA-IrPvQ5A8AMakYP922bTIX3XKm-A8WOtD1zRDo", email: "the_jön@hotmale.com", phoneNumber: "13371337", companyName: "Jön AB"})
      });
      const content = await rawResponse.json();
    
      console.log(content);
    })();
  }*/