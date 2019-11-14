function showSearch() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("myInput").focus();
    let showLogo = document.getElementById("logo");
    if (showLogo.style.display == "none") {
        showLogo.style.display = "block";
    } else {
        showLogo.style.display = "none";
    }
}

function filterFunction() {
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();
    let div = document.getElementById("myDropdown");
    let a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}


