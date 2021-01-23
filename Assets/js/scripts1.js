var submitButtonEl= document.getElementById("button-submit");

//save to local storage
var saveForm = function(formObject){
formsList = JSON.parse(localStorage.getItem("formsList"));



        if (formsList && (!email =="") ){
            if (!formsList.some(formob => formob.email == formObject.email))
                {formsList.push(formObject);
                alert("We received your request"); ///////////////modal
                }
            else {alert("The email already exists in our system")};   /////////////////// modal
        }
        else { if (!email =="") { formsList=[formObject]}
                else {alert("Please fill the email adress!"); ///////////////modal};
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

    var formNameEl= document.getElementById("name"); console.log(formNameEl);console.log(formNameEl.value);
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

// click the form submit button
submitButtonEl.addEventListener("click", submitForm);