

function showSearch() {
    let showBar = document.getElementById("form-control");
    if (showBar.style.display === "none") {
      showBar.style.display = "inline-block";
    } else {
      showBar.style.display = "none";
    }
    let showLogo = document.getElementById("logo");
    if (showLogo.style.display === "block") {
        showLogo.style.display = "none";
    } else {
        showLogo.style.display = "block";
    }
  }

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
