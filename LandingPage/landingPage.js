
document.addEventListener("DOMContentLoaded", function (e) {
    //Visar textArea samt knapp för välj kund när man klickar på lägg till task.
    function showTask() {
        var userInput = document.getElementById("userInput");
        var testgrid = document.getElementById("gridAddTask");
        if (testgrid.style.display === "none") {
            testgrid.style.display = "grid";
        } else {
            testgrid.style.display = "none";
        }
        btnXitToDo.addEventListener("click", function (e) {
            testgrid.style.display = "none";
            userInput.value = " ";
        });
    }

    //Eventlitener för att lägga till task.
    btnCheckToDo.addEventListener("click", function (e) {
        toDoAddItem();
    });

    //Genererar dagens datum och tid, convertar från millisekunder.
    function getTodaysDate() {
        var rightNow = new Date();
        var dd = String(rightNow.getDate()).padStart(2, '0');
        var mm = String(rightNow.getMonth() + 1).padStart(2, '0');
        var h = rightNow.getHours();
        var m = rightNow.getMinutes();

        var yyyy = rightNow.getFullYear();
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        rightNow = yyyy + '-' + mm + '-' + dd + ' kl ' + h + ":" + m;
        return rightNow;
    }

    let i = 0;
    function toDoAddItem() {
        //Skapar dagens datum och tid, skapar en div som printar ut detta.
        let commentTimestamp = document.createElement("div");
        commentTimestamp.setAttribute('class', 'commentTimestamp');
        document.getElementById("todo-items").appendChild(commentTimestamp);
        commentTimestamp.innerHTML = getTodaysDate(); //Hämtar datum och tid från metoden.

        //Hämtar data från användaren.
        let userInput = document.getElementById("userInput").value;
        var selectedCompany = document.getElementById("company");

        //Skapar en div container som innehåller alla append items.
        let createDiv = document.createElement("div");
        createDiv.setAttribute("class", "divToDo");

        //Hämtar värdet från vilket bolag användaren har valt och skapar en länk av det.
        let createLink = document.createElement("a");
        createLink.href = "../visaKundkort/visaKundKort.html";
        createLink.innerHTML = selectedCompany.value;

        //Skapar en input som blir en checkbox, skapar label samt unikt ID per checkbox.
        let createCheckbox = document.createElement("input");
        createCheckbox.type = "checkbox";
        createLabel = document.createElement("label");
        createCheckbox.setAttribute("id", "toggle" + i);
        
        createDiv.appendChild(createLabel);
        createLabel.appendChild(createCheckbox);
        createLabel.innerHTML += ' ' + userInput;
        createDiv.appendChild(createLink);
        document.getElementById("todo-items").appendChild(createDiv);

        //Hämtar alla ids som har toggle
        var checkbox = document.querySelector("#toggle" + i);
        var footerTrashBtn = document.getElementsByClassName("papperskorg")[0];
        var footerMoreBtn = document.getElementsByClassName("footerMoreBtn")[0];

        //Kollar om checkboxen är iklickad och visar papperskorgen.
        checkbox.addEventListener('click', function (qwe) {
            if (checkbox.checked == true) {
                footerTrashBtn.classList.remove("hidden");
                footerMoreBtn.classList.add("hidden");
            } else if (checkbox.checked == false) {
                footerTrashBtn.classList.add("hidden");
                footerMoreBtn.classList.remove("hidden");
            }
        });

        //Kollar om papperskorgen är iklickad och döljer div-containern med items samt papperskorgen.
        document.getElementById("trash").addEventListener("click", function (e) {
            footerTrashBtn.classList.add("hidden");
            footerMoreBtn.classList.remove("hidden");
            if (checkbox.checked) {
                createDiv.style.display = "none";
                commentTimestamp.style.display = "none";
            }
        });
        i++;
    }

    //Visar items i övriga dagar, samt byter färg på "idag" & "övriga dagar", beroende på vilken flik användaren är inne på.
    function toggleToDoNextDay() {
        let toDoItems = document.getElementById("todo-items");
        let toDoItemsNextDay = document.getElementById("toDo-item-nextDay");
        toDoItemsNextDay.style.display = "none";

        var nextDayBtn = document.querySelector("#nextDayTask");

        let todayBtn = document.querySelector("#todayTask");
        todayBtn.addEventListener("click", function (e) {
            toDoItems.style.display = "block";
            toDoItemsNextDay.style.display = "none";

            nextDayBtn.style.background = "white";
            nextDayBtn.style.color = "black";
            todayBtn.style.background = "#002965";
            todayBtn.style.color = "white"

        });

        nextDayBtn.addEventListener("click", function (e) {
            toDoItems.style.display = "none";
            toDoItemsNextDay.style.display = "block";

            nextDayBtn.style.background = "#002965";
            nextDayBtn.style.color = "white"
            todayBtn.style.background = "white";
            todayBtn.style.color = "black";
        });

    }

    toggleToDoNextDay();
    showTask();

    document.getElementById("btnAddTodo").addEventListener("click", function (e) {
        showTask();
        document.getElementById("userInput").focus();
    });

    document.getElementById("company").addEventListener("change", function(e){
        document.getElementById("userInput").focus();
        
    });
});
