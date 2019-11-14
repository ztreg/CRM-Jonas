
//Visar / gömmer popUpfönstret på knappen moreBtn & moreTxt
let popUp = document.getElementById("popUpArea");
popUp.style.display = "none"
document.getElementById("moreBtn").addEventListener("click", function(){
    if(popUp.style.display === "flex"){
        popUp.style.display ="none";
    }
    else{popUp.style.display ="flex";
    }
    
});
document.getElementById("moreTxt").addEventListener("click", function(){
    if(popUp.style.display === "flex"){
        popUp.style.display ="none";
    }
    else{popUp.style.display ="flex";
    }
});


