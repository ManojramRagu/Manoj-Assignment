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