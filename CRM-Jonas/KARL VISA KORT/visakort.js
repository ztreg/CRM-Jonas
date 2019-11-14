let userData;
fetch('https://5da7897d23fa740014697829.mockapi.io/customer/', {
	method: "GET"
})
  .then(response => {
  	return response.json()
    })
  .then(data =>{
      console.log(data);
   userdata = data;
   showData(userData);
 });

function showData(json) {
    document.getElementById('customerCompanyName').innerHTML = "JONAS AB";
    console.log(json);
    let detailj = document.getElementsByClassName('detailtItems');

    for(let i = 0; i < detailj.length; i++) {
        detailj[i].innerHTML = "TESTING " + i;
    }
    

}
