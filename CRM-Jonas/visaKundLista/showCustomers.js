class CustomerInfo {
  constructor(){
    this.getData();
    this.customerData = [];
  }

  getData() {
    fetch('https://5da7897d23fa740014697829.mockapi.io/customer/', {
      method: "GET"
    })
      .then(response => {
        return response.json()
        })
      .then(data =>{
        this.customerData.push(data[0].firstName);
        console.log(this.customerData);
       this.displayAllCustomers(data);
     });
  }
  displayAllCustomers(json) {
    let allCustomers = json;
    console.log(allCustomers);
   
    let box = document.getElementsByClassName('allCustomers')[0];
    for(let i = 0; i < 10; i++) {

      let row = document.createElement('div');
      row.id = "row" + i ;
      
      let chkBox = document.createElement('input');
      chkBox.type = "checkbox";
      chkBox.name = "chBox";

      let idBox = document.createElement('div');
      idBox.id = "idBox";
      idBox.innerHTML = "ID: " + allCustomers[i].id;
    
      let nameBox = document.createElement('div');
      nameBox.id = "nameBox"
      nameBox.innerHTML = "Företag: " + allCustomers[i].companyName;;
      
      let showCard = document.createElement('a');
      showCard.setAttribute("href", "../visaKundKort/visaKundKort.html");
      showCard.innerHTML = <i class="fas fa-angle-double-right"></i>;
      showCard.id = "showcard";

      row.appendChild(chkBox); 
      row.appendChild(idBox);
      row.appendChild(nameBox);
      row.appendChild(showCard);
      box.appendChild(row);
  
    }
}

  check() {
  let checkboxes = document.getElementsByName('chBox');
  for(let i = 0; i < checkboxes.length; i++) {
    if(checkboxes[i].checked == true) {
      console.log("Checkbox nmr; " + i + " är checkad");

    }
    else if (checkboxes[i].checked == false){
      console.log("Checkbox nmr; " + i + " är inte checkad");
    }
  }
}


}


$(document).ready(){
  let dataBaseCustomer = new CustomerInfo();
}













 



