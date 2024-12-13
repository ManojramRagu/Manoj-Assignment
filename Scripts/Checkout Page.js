let paymentMethod = document.getElementById("paymentMethod");
let cardDetails = document.getElementById("cardDetails");

function displayCardInfo(){
    if(paymentMethod.value === "card"){
        cardDetails.style.display = "block"
    }
    else{
        cardDetails.style.display = "none"
    }
}

// Add event listener to trigger displayCardInfo on payment method change
paymentMethod.addEventListener("change", displayCardInfo);

// Trigger displayCardInfo once when the page loads to set initial state
window.addEventListener("DOMContentLoaded", displayCardInfo);