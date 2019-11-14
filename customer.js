class Customer {
    constructor() {
        this.allCustomerID = []; //Pusha ID från mockyapi till allCustomerID.
        this.allCustomerData = [];
        this.companyName = [];
        this.customerNames = [];
        this.toDoDate = [];
        this.randomTask = [
            "Boka möte med Åsa",
            "Stäm av avtal",
            "Köp blommor till Fredrik",
            "Lunch-möte",
            "Fråga kring fakturan",
            "Ring upp Anna",
            "Bjud in till event",
            "Följ upp lead"
        ];
    }
    getCustomer() {
        fetch('https://5da7897d23fa740014697829.mockapi.io/customer/', {
            method: "GET"
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.showData(data);
            });
    }
    getToDo() {
        fetch('http://5da7897d23fa740014697829.mockapi.io/todo', {
            method: "GET"
        })
            .then(response => {
                return response.json()
            })
            .then(toDoData => {
                this.showNextDayTask(toDoData);
            });
    }

    showData(data) {
        for (let allCustomers of data) {
            let x = allCustomers.id;
            this.allCustomerID.push(x);
            let y = allCustomers.companyName;
            this.companyName.push(y);
            let z = allCustomers.firstName;
            this.customerNames.push(z);  //Namn, Företagsnamn, Datum, och Data.
        }
        let company1 = document.getElementById("company1");
        company1.innerHTML = this.companyName[0];
        let company2 = document.getElementById("company2");
        company2.innerHTML = this.companyName[1];
        let company3 = document.getElementById("company3");
        company3.innerHTML = this.companyName[2];
        let company4 = document.getElementById("company4");
        company4.innerHTML = this.companyName[3];
    }

    showNextDayTask(toDoData) {
        for (let allToDo of toDoData) {
            let x = allToDo.date;
            this.toDoDate.push(x);
        }

        this.i = Math.floor(Math.random() * 9);

        var nextDayItems = document.getElementsByClassName('class-nextDay')[0];
        var allcheckboxes = [];

        for (let i = 0; i < 5; i++) {
            this.year = 2019 + Math.round(1 - Math.sin(Math.random()));
            this.month = Math.round(Math.random() * 12 + 1);
            this.date = Math.round(Math.random() * 30 + 1);
            this.totalDate = `${this.year}-${this.month}-${this.date}`;
            let random = Math.floor(Math.random() * this.randomTask.length);
            this.text = this.randomTask[random];

            var createDiv = document.createElement('div');
            createDiv.setAttribute("class", "divToDo2");

            var chkBox = document.createElement('input');
            chkBox.type = "checkbox";
            chkBox.name = "chBox";
            chkBox.setAttribute("id", "tgl" + i);
            allcheckboxes.push(createDiv);

            var spanText = document.createElement('span');
            spanText.id = "spanText";
            spanText.innerHTML = this.text;

            var createLink = document.createElement('a');
            createLink.setAttribute("href", "../visaKundKort/visaKundKort.html");
            createLink.innerHTML = `${this.companyName[i]} <br>`;

            var createSpan = document.createElement('span');
            createSpan.setAttribute("class", "date");
            createSpan.innerHTML = ` <br> Datum: ${this.totalDate} | Kontakt: ${this.customerNames[i]}`;

            createDiv.appendChild(chkBox);
            createDiv.appendChild(spanText);
            createDiv.appendChild(createLink);
            createDiv.appendChild(createSpan);
            nextDayItems.appendChild(createDiv);
            var nxtDayChkbox = document.querySelector("#tgl" + i);
            var chkBoxes = document.getElementsByName('chBox');
    
            nxtDayChkbox.addEventListener('click', function (qwe) { //Vi behöver fixa denna eventlistener i denna JS och i VisaKundLista
                trash.classList.remove("hidden");
                for (let y = 0; y < chkBoxes.length; y++) {
                    if (chkBoxes[y].checked == true) {
                        trash.classList.remove("hidden");
                    }
                }
            });
        }
        let trash = document.querySelector(".toggled");

        document.getElementById("trash").addEventListener("click", function (e) {
            trash.classList.add("hidden");
            for (let i = 0; i < chkBoxes.length; i++) {
                if (chkBoxes[i].checked == true) {
                    allcheckboxes[i].style.display = "none";
                }
            }
        });
    }

    deleteCustomer(chosenCustomerID) {
        console.log(this.allCustomerID[0]); //Här ska chosenCustomerID stoppas in istället för 0.
        fetch('https://5da7897d23fa740014697829.mockapi.io/customer/' + this.allCustomerID[0], {
            method: "DELETE"
        })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(data => {
                console.log(data);
            });
    }
}

let customerClass = new Customer();

customerClass.getCustomer();
customerClass.getToDo();

// btnDeleteCustomer = document.getElementById("btnDeleteCustomer");
// btnDeleteCustomer.addEventListener("click", function (e) {
//     customerClass.deleteCustomer();
// });