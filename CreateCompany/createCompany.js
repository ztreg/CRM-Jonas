let content = document.getElementById("content");
let contentCustomerCard = document.getElementById("customerCardContent");
contentCustomerCard.style.display = "none";
let hide = document.getElementById("createButton").addEventListener("click", function(){ console.log("wokring")
    if(content.style.display = "block"){
        content.style.display = "none";
        contentCustomerCard.style.display = "block";
    }
    else{
        content.style.display = "block";
    }
})




//EDIT OR REMOVE COMMENT (Toggle editMode)
document.addEventListener("DOMContentLoaded", function(event) {
    const editComment = document.getElementById("editCommentButton");
    editComment.addEventListener("click", function(e) {
        e.preventDefault();

        var a = document.querySelectorAll(".toggleCheckbox")
        var b = document.querySelectorAll(".textField")
        var c = document.querySelectorAll(".detailsContainer")

        //EDITMODE ON ALL COMMENTS + SHOW CHECKBOX:
        function toggleEditMode() {
            for (var i = 0; i < a.length; i++) {
                
                a[i].classList.toggle("hidden");
                a[i].classList.toggle("whatBox"[i]);
                b[i].toggleAttribute('contenteditable');
                
            }
            //EDITMODE ON CUSTOMER DATA INDEPENDENT OF COMMENTS:
            for (var i = 0; i < c.length; i++) {
                c[i].toggleAttribute('contenteditable');
            }
        }

        toggleEditMode()    
    
    });
});

//...................................................................................................................................................
//CREATE NEW COMMENT

document.addEventListener("DOMContentLoaded", function(event) {
    const newComment = document.getElementById("newCommentButton");
    newComment.addEventListener("click", function(e) {
        e.preventDefault();

        let commentInputField = document.createElement("textarea");
        commentInputField.setAttribute("id", "commentInputField");
        commentInputField.setAttribute("placeholder", "Ny anteckning");
        document.getElementById("insertComment").appendChild(commentInputField);
        
        //GRAYBOX CREATION (transparent gray area on top of everything except comment field to emphasize focus on the comment field)
        let grayBox = document.createElement("div");
        grayBox.setAttribute('id', 'grayBox');
        document.getElementById("grayBoxSpawner").appendChild(grayBox);

        //CREATE CONTAINER FOR BUTTONS INSIDE COMMENT AREA
        let commentButtonContainer = document.createElement("div");
        commentButtonContainer.setAttribute("id", "insideCommentButtonContainer")
        document.getElementById("insertComment").appendChild(commentButtonContainer);
        
        //CREATE CANCELBUTTON INSIDE COMMENT AREA
        let commentCancel = document.createElement("button")
        commentCancel.setAttribute("id", "commentCancelButton");
        commentCancel.setAttribute("class", "fa fa-times-circle-o");
        document.getElementById("insideCommentButtonContainer").appendChild(commentCancel);
        
        //CREATE SUBMITBUTTON INSIDE COMMENT AREA
        let commentSubmit = document.createElement("button");
        commentSubmit.setAttribute("id", "commentSubmitButton");
        commentSubmit.setAttribute("class", "fa fa-check-circle-o");
        document.getElementById("insideCommentButtonContainer").appendChild(commentSubmit);

        //MAKE OTHER BUTTONS GRAY
        document.getElementById("removeCommentButton").setAttribute('id', 'focusColor2');
        document.getElementById("editCommentButton").setAttribute('id', 'focusColor3')

        //CREATE IMPUT MARKER ("I")
        let inputMarker = document.createElement("div");
        inputMarker.setAttribute('id', "inputMarker");
        document.getElementById("insertComment").appendChild(inputMarker);

        //MOVE FOCUS TO INPUT
        document.getElementById('commentInputField').focus();

    //ACTIVATION OF SUBMIT COMMENT BUTTON
    const submitbutton = document.getElementById("commentSubmitButton")
    submitbutton.addEventListener("click", function(e) {
    e.preventDefault();
    let userInput = document.getElementById("commentInputField").value

        //RETURN TO DEFULT VIEW
        commentInputField.remove();
        insideCommentButtonContainer.remove();
        grayBox.remove();
        inputMarker.remove();
        document.getElementById("focusColor2").setAttribute('id', 'removeCommentButton');
        document.getElementById("focusColor3").setAttribute('id', 'editCommentButton')

        //TIME STAMP (Including formatting)
        var rightNow = new Date();
        var dd = String(rightNow.getDate()).padStart(2, '0');
        var mm = String(rightNow.getMonth() + 1).padStart(2, '0');
        var h = rightNow.getHours();
        var m = rightNow.getMinutes();
        
        var yyyy = rightNow.getFullYear();
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m
        rightNow = yyyy + '-' + mm + '-' + dd + ' kl ' + h + ":" + m

        //ENTIRE COMMENT AREA CREATION (PARENT DIV)
        let commentArea = document.createElement("div")
        commentArea.setAttribute("id", "commentContainer");
        document.getElementById("notesField").appendChild(commentArea);
        
        //POSITION NEW COMMENT ON TOP
        var position = document.getElementById("notesField");
        position.insertBefore(commentArea, position.childNodes[0]);
    
        //CHECKBOX CREATION (hidden if not in editMode)
        let commentCheckbox = document.createElement("input");
        commentCheckbox.type = "checkbox";
        commentCheckbox.setAttribute("class", "hidden toggleCheckbox");
        commentCheckbox.setAttribute("id", "checkbox1");
        document.getElementById("commentContainer").appendChild(commentCheckbox);

        //TIMESTAMP CREATION
        let commentTimestamp = document.createElement("div");
        commentTimestamp.setAttribute('class', 'commentTimestamp');
        document.getElementById("commentContainer").appendChild(commentTimestamp);
        commentTimestamp.innerHTML = rightNow
        document.getElementById("apiTimestampTarget").innerHTML = rightNow;
        console.log(rightNow)

        //TEXTFIELD CREATION
        let textField = document.createElement("div");
        textField.setAttribute('class', 'textField');
        document.getElementById("commentContainer").appendChild(textField);
        textField.innerHTML = userInput

    });

    //ACTIVATION OF CANCEL COMMENT BUTTON
    const cancelbutton = document.getElementById("commentCancelButton")
    cancelbutton.addEventListener("click", function(e) {
    e.preventDefault();
    commentInputField.remove();
    insideCommentButtonContainer.remove();
    grayBox.remove();
    inputMarker.remove();
    document.getElementById("focusColor2").setAttribute('id', 'removeCommentButton');
    document.getElementById("focusColor3").setAttribute('id', 'editCommentButton');
 
    });

});
});

//Checkbox


        




