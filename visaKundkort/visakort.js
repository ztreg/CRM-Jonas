/*ATT GÖRA:
3. fixa till fulkoden avseende borttagande av element (Gör det till en funktion som matchar IDn eller bara att aktuella checkboxes tar bort sitt parentElement)

*/

document.addEventListener("DOMContentLoaded", function() {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// viewCustomerCard Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class viewCustomerCard {
    constructor() {

        //Event listeners for initial buttons; new-comment, remove-comment,edit-comment and exit(prev page)
        document.getElementById("exButton").addEventListener("click", this.previousPage);
        document.getElementById("newCommentButton").addEventListener("click", this.newCommentInput);
        document.getElementById("removeCommentButton").addEventListener("click", this.removeSelectedItems);
        document.getElementById("editCommentButton").addEventListener("click", this.editMode);
        
    }    

    /*------------------------------------------------------------------------------
     EXIT (activation of ex button)
    ------------------------------------------------------------------------------*/
    previousPage() {
    window.history.back();
    }

    /*------------------------------------------------------------------------------
     NEW COMMENT (activation of new-comment button)
    ------------------------------------------------------------------------------*/
    newCommentInput() {

        //Textarea for input
        let commentInputField = document.createElement("textarea");
        commentInputField.setAttribute("id", "commentInputField");
        commentInputField.setAttribute("placeholder", "Ny anteckning");
        document.getElementById("insertComment").appendChild(commentInputField);
        document.getElementById('commentInputField').focus(); //moves focus to input 
        
            //Input marker "I" 
            let inputMarker = document.createElement("div");
            inputMarker.setAttribute('id', "inputMarker");
            document.getElementById("insertComment").appendChild(inputMarker);

            //Button container (contains two comment related buttons: Submit and Cancel)
            let commentButtonContainer = document.createElement("div");
            commentButtonContainer.setAttribute("id", "insideCommentButtonContainer")
            document.getElementById("insertComment").appendChild(commentButtonContainer);

                //Cancel button
                let commentCancel = document.createElement("button")
                commentCancel.setAttribute("id", "commentCancelButton");
                commentCancel.setAttribute("class", "fa fa-times-circle-o");
                document.getElementById("insideCommentButtonContainer").appendChild(commentCancel);
                    
                    //Event listener for Cancel button
                    document.getElementById("commentCancelButton").addEventListener("click", function(){
                    backToDefaultView()
                    });

                //Submit Button
                let commentSubmit = document.createElement("button");
                commentSubmit.setAttribute("id", "commentSubmitButton");
                commentSubmit.setAttribute("class", "fa fa-check-circle-o");
                document.getElementById("insideCommentButtonContainer").appendChild(commentSubmit);
                    
                    //Event listener for Submit button
                    document.getElementById("commentSubmitButton").addEventListener("click", function(){
                    commentCreation()
                    backToDefaultView()
                    
                    });
        
        //Gray out other buttons (makes edit- and remove buttons gray to emphasize focus on new comment)
        document.getElementById("removeCommentButton").setAttribute('id', 'focusColor2');
        document.getElementById("editCommentButton").setAttribute('id', 'focusColor3')

        //Gray box (transparent gray area/shadow on top of everything except comment field to emphasize focus on the comment field)
        let grayBox = document.createElement("div");
        grayBox.setAttribute('id', 'grayBox');
        document.getElementById("grayBoxSpawner").appendChild(grayBox);
        
    }
    


    /*------------------------------------------------------------------------------
     EDIT MODE (activation of edit-comment button)
    ------------------------------------------------------------------------------*/
    editMode() {
        var a = document.querySelectorAll(".toggleCheckbox")
        var b = document.querySelectorAll(".textField")
        var c = document.querySelectorAll(".detailsContainer")
        var d = document.querySelectorAll("#commentContainer")
    
        //Engage editmode(toggle) on all comments:
        
            for (var i = 0; i < a.length; i++) {
    
                a[i].classList.toggle("hidden");
                a[i].classList.toggle("whatBox"+[i]);
                
                b[i].toggleAttribute('contenteditable');
                b[i].classList.toggle("editHighlight");
                
            }
        
        //Engage editmode(toggle) on customer data:
            for (var i = 0; i < c.length; i++) {
                c[i].toggleAttribute('contenteditable');
                c[i].classList.toggle("editHighlight");
            
        }

        //Add ID to comments to pair checkboxes with comments (neccecary for function "removeSelectedItems")
            for (var i = 0; i < d.length; i++){
                d[i].classList.toggle("whatComment"+[i]);
            }
    
    };


    /*------------------------------------------------------------------------------
     REMOVE ITEMS (activation of remove-comment button)
    ------------------------------------------------------------------------------*/
    removeSelectedItems() {

        var checkbox0 = document.querySelector(".whatBox"+[0])
        var checkbox1 = document.querySelector(".whatBox"+[1])
        var checkbox2 = document.querySelector(".whatBox"+[2])
        var checkbox3 = document.querySelector(".whatBox"+[3])

        if (checkbox0.checked == true){
            document.querySelector(".whatComment0").remove();
        }

        if (checkbox1.checked == true){
            document.querySelector(".whatComment1").remove();
        }

        if (checkbox2.checked == true){
            document.querySelector(".whatComment2").remove();
        }

        if (checkbox3.checked == true){
            document.querySelector(".whatComment3").remove();
        }

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// END OF viewCustomerCard Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /*------------------------------------------------------------------------------
     CREATE COMMENT (fires when clicking submit comment button)
    ------------------------------------------------------------------------------*/
    function commentCreation() {

        //Creation of comment area (container for each comment)
        let commentArea = document.createElement("div")
        commentArea.setAttribute("id", "commentContainer");
        document.getElementById("notesField").appendChild(commentArea);
        //Position of new comment on top (latest comment highest up)
        var position = document.getElementById("notesField");
        position.insertBefore(commentArea, position.childNodes[0]);

            //Timestamp (formatting)
            var rightNow = new Date();
            var dd = String(rightNow.getDate()).padStart(2, '0');
            var mm = String(rightNow.getMonth() + 1).padStart(2, '0');
            var h = rightNow.getHours();
            var m = rightNow.getMinutes();
        
            var yyyy = rightNow.getFullYear();
            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m
            rightNow = yyyy + '-' + mm + '-' + dd + ' kl ' + h + ":" + m

            //Creation of checkbox (hidden if not in editMode)
            let commentCheckbox = document.createElement("input");
            commentCheckbox.type = "checkbox";
            commentCheckbox.setAttribute("class", "hidden toggleCheckbox");
            commentCheckbox.setAttribute("id", "checkbox");
            document.getElementById("commentContainer").appendChild(commentCheckbox);

            //Creation of timestamp element
            let commentTimestamp = document.createElement("div");
            commentTimestamp.setAttribute('class', 'commentTimestamp');
            document.getElementById("commentContainer").appendChild(commentTimestamp);
            commentTimestamp.innerHTML = rightNow

            //Creation of text
            let textField = document.createElement("div");
            textField.setAttribute('class', 'textField');
            document.getElementById("commentContainer").appendChild(textField);
            let userInput = document.getElementById("commentInputField").value
            textField.innerHTML = userInput

}

    /*------------------------------------------------------------------------------
     RETURN TO DEFAULT VIEW
    ------------------------------------------------------------------------------*/
    function backToDefaultView() {

        commentInputField.remove();
        insideCommentButtonContainer.remove();
        grayBox.remove();
        inputMarker.remove();
        document.getElementById("focusColor2").setAttribute('id', 'removeCommentButton');
        document.getElementById("focusColor3").setAttribute('id', 'editCommentButton')

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Get details and comments from API
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*------------------------------------------------------------------------------
     GET CUSTOMER DETAILS FROM API
    ------------------------------------------------------------------------------*/
    fetch('https://5da7897d23fa740014697829.mockapi.io/customer/', {
            method: "GET"
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            userdata = data;
            customerDetailsApi(data);
        });


    //Choose random customer for display
    function customerDetailsApi(json) {
        let randomKund = Math.floor(Math.random() * json.length);

        let detailj = document.getElementsByClassName('detailsContainer');
        let companyName = json[randomKund].companyName;
        let name = json[randomKund].firstName + " " + json[randomKund].lastName;
        let phone = json[randomKund].phoneNumber;
        let email = json[randomKund].email;
        let kundID = json[randomKund].id;

        let img = new Image();
        img.src = json[randomKund].avatar;
        img.setAttribute('width', '100%');

        document.getElementById('customerCompanyName').innerHTML += companyName;
        document.getElementById('avatarBox').appendChild(img);

        detailj[0].innerHTML += name;
        detailj[1].innerHTML += kundID;
        detailj[2].innerHTML += email;
        detailj[3].innerHTML += phone;
    }

    /*------------------------------------------------------------------------------
     GET CUSTOMER COMMENT FROM API
    ------------------------------------------------------------------------------*/
    fetch('http://5da7897d23fa740014697829.mockapi.io/comment', {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .then(apiComment => {
        customerCommentApi(apiComment);

    });
    

    //Chose random customer for display
    function customerCommentApi(json) {
    let randomKund = Math.floor(Math.random() * json.length);

    var dateInput = json[randomKund].date

    //Date formatting
    var date = dateInput.substr(0, 10);
    var time = dateInput.substr(11, 5);

    //Insert aquired comment into HTML
    document.getElementById('apiCommentTarget').innerHTML = json[randomKund].comment + " (Detta är en randomkommentar från api för att visa funktionalitet)";
    document.getElementById('apiTimestampTarget').innerHTML = date + " kl " + time;

}

new viewCustomerCard();

});


  