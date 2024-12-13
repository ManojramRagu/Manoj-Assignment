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

paymentMethod.addEventListener("change", displayCardInfo);

window.addEventListener("DOMContentLoaded", displayCardInfo);