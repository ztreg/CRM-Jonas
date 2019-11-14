class CustomerData {
    constructor() {
        this.allCustomerID = []; //Innehåller alla ID från MockAPI.
        this.companyName = []; // Innerhåller alla företagsnamn från MockAPI.
        this.customerNames = []; // Innehåller alla förnamn från MockAPI.
        this.randomTask = [
            "Boka möte med Åsa",
            "Stäm av avtal",
            "Köp blommor till Fredrik",
            "Lunch-möte",
            "Fråga kring fakturan",
            "Ring upp Anna",
            "Bjud in till event",
            "Följ upp lead",
            "Återkoppla kring behov"
        ];
    }

    getCustomer() { //Hämtar data från MockAPI (Customer)
        fetch('https://5da7897d23fa740014697829.mockapi.io/customer/', {
            method: "GET"
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.showData(data);
                this.showNextDayTask(data);
            });
    }

    showData(data) { //Pushar in datan i arrayerna i huvudklassen.
        for (let allCustomers of data) {
            let x = allCustomers.id;
            this.allCustomerID.push(x);
            let y = allCustomers.companyName;
            this.companyName.push(y);
            let z = allCustomers.firstName;
            this.customerNames.push(z);
        }
        //Skriver ut företagsnamnen från MockAPI till välj kund listan.
        for (let i = 0; i <= 6; i++) {
            var company = document.getElementsByClassName("company")[i];
            company.innerHTML = this.companyName[i];
        }
    }

    //Skapar ett random datum & genererar random task.
    generateRandom() {
        this.year = 2019 + Math.round(1 - Math.sin(Math.random()));
        this.month = Math.round(Math.random() * 12 + 1);
        this.date = Math.round(Math.random() * 30 + 1);
        this.totalDate = `${this.year}-${this.month}-${this.date}`;
        let random = Math.floor(Math.random() * this.randomTask.length);
        this.text = this.randomTask[random];
        return this.text;
    }
    //Skapar 5 random items i "övriga dagar", random datum, företagsnamn, förnamn och randomTask.
    showNextDayTask(data) {
        this.i = Math.floor(Math.random() * 9);
        var nextDayItems = document.getElementsByClassName('class-nextDay')[0];
        var allcheckboxes = [];

        for (let i = 0; i < 5; i++) {
            this.generateRandom();

            var createDiv = document.createElement('div');
            createDiv.setAttribute("class", "divToDo2");

            var chkBox = document.createElement('input');
            chkBox.type = "checkbox";
            chkBox.name = "chBox";
            chkBox.setAttribute("id", "tgl" + i);
            allcheckboxes.push(createDiv);

            var spanText = document.createElement('span');
            spanText.innerHTML = " " + this.text;

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
            var footerTrashBtn = document.getElementsByClassName("papperskorg")[0];
            var footerMoreBtn = document.getElementsByClassName("footerMoreBtn")[0];

            //Kollar om checkboxen är iklickad och visar papperskorgen.
            nxtDayChkbox.addEventListener('click', function (qwe) {
                let textinputs = document.querySelectorAll('input[type=checkbox]');
                let empty = [].filter.call(textinputs, function (el) {
                  return !el.checked;
                });
                if (textinputs.length == empty.length) {
                    footerMoreBtn.classList.remove("hidden");
                    footerTrashBtn.classList.add("hidden");;
                }
                for (let y = 0; y < chkBoxes.length; y++) {
                    if (chkBoxes[y].checked == true) {
                        footerTrashBtn.classList.remove("hidden");
                        footerMoreBtn.classList.add("hidden");
                    }
                }
            });
        }

        //Kollar om papperskorgen är iklickad och döljer div-containern med items samt papperskorgen.
        document.getElementById("trash").addEventListener("click", function (e) {
            footerTrashBtn.classList.add("hidden");
            footerMoreBtn.classList.remove("hidden");
            for (let i = 0; i < chkBoxes.length; i++) {
                if (chkBoxes[i].checked == true) {
                    allcheckboxes[i].style.display = "none";
                }
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    let customerClass = new CustomerData();
    customerClass.getCustomer();
});
