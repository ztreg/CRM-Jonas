class Company{
    constructor(companyName, contactperson, telephone, email, customerId, notes){
        this.companyName = companyName;
        this.contactperson = contactperson;
        this.telephone  = telephone;   
        this.email = email;
        this.customerId = customerId;
        this.notes = notes;
       }
        getInfo(){
            this.createNewCompany()
        }
       createNewCompany(){
           let companyName = createInputs[0].value;
           let contactperson = createInputs[1].value;
           let telephone = createInputs[2].value;
           let email = createInputs[3].value;
           let customerId = createInputs[4].value;
           let notes = createInputs[5].value;
           let company1 = new Company(companyName, contactperson ,telephone ,email ,customerId, notes)
                console.log(company1); 
            document.getElementById("customerCompanyName").innerHTML += companyName
            document.getElementById("contactName").innerHTML += contactperson ;
            document.getElementById("customerId").innerHTML = customerId ;
            document.getElementById("email").innerHTML =  email ;
            document.getElementById("phoneNr").innerHTML =  telephone ;
            var d = new Date
            var month = new Array();
            month[0] = "01";
            month[1] = "02";
            month[2] = "03";
            month[3] = "04";
            month[4] = "05";
            month[5] = "06";
            month[6] = "07";
            month[7] = "08";
            month[8] = "09";
            month[9] = "10";
            month[10] = "11";
            month[11] = "12";
            var n = month[d.getMonth()];
            document.getElementById("apiTimestampTarget").innerHTML = d.getFullYear() + "-" + n + "-" + d.getDate();
            document.getElementById("apiCommentTarget").innerHTML = notes
           }
           
        showCustomerCard() {
            let detailj = document.getElementsByClassName('detailsContainer');
            img.setAttribute('width', '100%');
            document.getElementById('customerCompanyName').innerHTML += companyName;
            
        
            detailj[0].innerHTML += contactperson;
            detailj[1].innerHTML += customerId;
            detailj[2].innerHTML += email;
            detailj[3].innerHTML += telephone;
        }
       }
let createInputs = document.getElementsByClassName('createInput');
let company = new Company();
    





           
    

  
