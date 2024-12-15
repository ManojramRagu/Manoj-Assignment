let paymentMethod = document.getElementById("paymentMethod");
let cardDetails = document.getElementById("cardDetails");
let newTable = document.getElementById('checkout_table_container')

function displayCardInfo(){
    if(paymentMethod.value === "card"){
        cardDetails.style.display = "block"
    }
    else{
        cardDetails.style.display = "none"
    }
}

function getTableData(){
    const storedTableContent = JSON.parse(localStorage.getItem('tableContent'));
    if (storedTableContent) {
        newTable.innerHTML = storedTableContent;
    }
}

displayCardInfo()
getTableData()
paymentMethod.addEventListener("change", displayCardInfo);

const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const contactInput = document.getElementById("contact");

const cardDetailsContainer = document.getElementById("cardDetails");
const cardNumberInput = document.getElementById("cardNumber");
const cardNameInput = document.getElementById("cardName");
const expiryInput = document.getElementById("expiry");
const cvvInput = document.getElementById("cvv");

const payNowButton = document.getElementById("payNow");


// ERROR MESSAGES
const nameError = document.getElementById('nameError');
const addressError = document.getElementById('addressError');
const contactError = document.getElementById('contactError');
const cardNumberError = document.getElementById('cardNumberError');
const cardNameError = document.getElementById('cardNameError');
const cardExpiryError = document.getElementById('cardExpiryError');
const cardCVVError = document.getElementById('cardCVVError');

let inputsValidated = true;

function validateName(){
    const name = nameInput.value.trim();
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        nameError.innerText = "Name can contain only Letters and Spaces";
        inputsValidated = false;
    }
    else{
        nameError.innerText= "";
    }
}

function validateAddress() {
    const address = addressInput.value.trim()
    if (address === "") {
        addressError.innerText = "Address cannot be empty"
        inputsValidated = false;
    }
    else{
        addressError.innerText = "";
    }
}

function validateContact(){
    const contact = contactInput.value.trim();

    if (!/^\d+$/.test(contact) || contact.length !== 10) {
        contactError.innerText = "Please enter a valid number";
        inputsValidated = false;
    }
    else{
        contactError.innerText = "";
    }
}


function validateCardName(){
    // User's name on card
    const cardName = cardNameInput.value.trim();
    if (!/^[a-zA-Z\s]+$/.test(cardName)) {
        cardNameError.innerText = "Name can contain only Letters and Spaces";
        inputsValidated = false;
    }
    else{
        cardNameError.innerText= "";
    }
}

function validateCardNumber(){
    // Card Number
    const cardNumber = cardNumberInput.value.trim();

    if (!/^\d+$/.test(cardNumber) || cardNumber.length !== 16) {
        cardNumberError.innerText = "Please enter a valid card number";
        inputsValidated = false;
    }
    else{
        cardNumberError.innerText = "";
    }

}

function validateCardCVV(){
    // CVV
    const cardCVV = cvvInput.value.trim();
    
    if (!/^\d+$/.test(cardCVV) || (cardCVV.length > 4) || (cardCVV.length < 0)) {
        cardCVVError.innerText = "Please enter a valid CVV number";
        inputsValidated = false;
    }
    else{
        cardCVVError.innerText = "";
    }

}

function validateExpiry(){
    const expiryDate = new Date(expiryInput.value);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    if (expiryDate <= currentDate) {
        cardExpiryError.innerText = "Please enter a valid expiry date";
        inputsValidated = false;
    }
    else {
        cardExpiryError.innerText = "";
    }
}

function validateAllFunctions() {
    event.preventDefault();
    inputsValidated = true; 

    validateName();
    validateAddress();
    validateContact();

    if(paymentMethod.value === "card"){
        validateCardName();
        validateCardNumber();
        validateCardCVV();
        validateExpiry();
    }


    if (inputsValidated) {
        showSuccessMessage()
    } else
    {
        console.log("error")
    }
}


function showSuccessMessage() {
    alert("Thank you for your purchase")
    window.location.href = "Pharmacy Page.html";
}

// Attach event listeners to form inputs
nameInput.addEventListener("change", validateName);
addressInput.addEventListener("change", validateAddress);
contactInput.addEventListener("change", validateContact);
cardNumberInput.addEventListener("change", validateCardNumber);
cardNameInput.addEventListener("change", validateCardName);
expiryInput.addEventListener("change", validateExpiry);
cvvInput.addEventListener("change", validateCardCVV);

payNowButton.addEventListener("click", validateAllFunctions);