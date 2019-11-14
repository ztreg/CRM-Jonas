document.getElementById("moreBtn-customer").addEventListener("click", function(){
    if(popUpTwo.style.display === "flex"){
        popUpTwo.style.display ="none";
    }
    else{popUpTwo.style.display ="flex";
    }
    
});

document.getElementById("moreTxt-customer").addEventListener("click", function(){
    if(popUpTwo.style.display === "flex"){
        popUpTwo.style.display ="none";
    }
    else{popUpTwo.style.display ="flex";
    }
});


let popUpTwo = document.getElementById("popUpAreaTwo");
popUpTwo.style.display = "none";