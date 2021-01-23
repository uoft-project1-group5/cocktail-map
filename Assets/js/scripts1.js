var submitButtonEl= document.getElementById("button-submit");

var contactButtonEl= document.getElementById("contact-us-button");

//clear modal
var clearModal = function() {
    var modalHolderEl= document.getElementById("modalId");
    if (modalHolderEl) {modalHolderEl.remove()};
};
  
// display modal
var displayModal = function(modalTitle, modalText) {
    clearModal();
    var modalEl = document.createElement("div");
    modalEl.id ="modalId"
    modalEl.innerHTML = '<div><h1>'+modalTitle+'</h1><p>'+modalText+'</p></div>'
    var modalHolderEl= document.getElementById("modal-holder");
    modalHolderEl.append(modalEl);
};

//save to local storage
var saveForm = function(formObject){
formsList = JSON.parse(localStorage.getItem("formsList"));

        if (formsList && (!formObject.email =="") ){
            if (!formsList.some(formob => formob.email == formObject.email))
                {formsList.push(formObject);
                displayModal("Confirmation", "We received your request.");
            }
            else {displayModal("Alert", "The email already exists in our system.");
            };   
        }
        else { 
            if (!formObject.email =="") { 
                formsList=[formObject];
            }
            else {
                displayModal("Alert", "Please fill the email address!");
            };
        };
localStorage.setItem("formsList", JSON.stringify(formsList));
};

//send email
var sendEmail = function(email, title, message){
    window.open('mailto:'+email+'?subject='+title+'&body='+message);
};


// submit the form
var submitForm = function(event){
    event.preventDefault();

    var formNameEl= document.getElementById("name"); 
    var formEmailEl= document.getElementById("email"); 
    var formPhoneEl= document.getElementById("phone");
    var formCertificateYesEl= document.getElementById("certificate-yes"); 
    var formCertificateNoEl= document.getElementById("certificate-no"); 
    var formCheckbox18El= document.getElementById("checkbox-18"); 

    var formObject ={
        name: formNameEl.value,
        email : formEmailEl.value,
        phone : formPhoneEl.value,
        certYes : formCertificateYesEl.checked,
        certNo : formCertificateNoEl.checked,
        check18: formCheckbox18El.checked
    };

    //save to local storage
    saveForm(formObject);

    //clear the form
    formNameEl.value="";
    formEmailEl.value="";
    formPhoneEl.value="";
    formCertificateYesEl.checked=false;
    formCertificateNoEl.checked=false;
    formCheckbox18El.checked=false;
  };

// contact us
var contactUs= function(event){
    event.preventDefault();

    var formNameEl= document.getElementById("contact-name"); 
    var formPhoneEl= document.getElementById("contact-phone");
    var formMessageEl= document.getElementById("contact-message"); 
    
    //send email
    sendEmail ("contactus@barkeep.com", "Contact Request from: " + formNameEl.value , formMessageEl.value +"  Phone: " + formPhoneEl.value )

    //clear the form
    formNameEl.value="";
    formPhoneEl.value="";
    formMessageEl.value="";
  };

// click the form submit button
submitButtonEl.addEventListener("click", submitForm);

// click the contact button
contactButtonEl.addEventListener("click", contactUs);