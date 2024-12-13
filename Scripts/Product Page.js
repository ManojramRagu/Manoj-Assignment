displayProductCards()

// Add and Remove to cart functions

let tableData = document.getElementById("cart_body");
let cost = document.getElementById("total_cost");
total = 0;
cost.innerText = `${total} Rs`;

function addToCart(product, quantity) {
    const rows = tableData.getElementsByTagName("tr");
    let itemExists = false;

    for (let row of rows) {
        const productNameCell = row.cells[0];
        const productQuantityCell = row.cells[1];
        const productPriceCell = row.cells[2];

        if (productNameCell.innerText === product.name) {

            const currentQuantity = parseInt(productQuantityCell.innerText);
            const newQuantity = currentQuantity + parseInt(quantity);
            productQuantityCell.innerText = newQuantity;
            productPriceCell.innerText = newQuantity * parseInt(product.price);

            total += parseInt(product.price) * parseInt(quantity);
            cost.innerText = `${total} Rs`;

            itemExists = true;
            break;
        }
    }

    if (!itemExists) {
        const tableRow = document.createElement("tr");
        const tableProductName = document.createElement("td");
        const tableProductQuantity = document.createElement("td");
        const tableProductPrice = document.createElement("td");
        const deleteIcon = document.createElement("img");
        const deleteButton = document.createElement("button");

        deleteIcon.src = "Images/Pharmacy/Delete Icon.png";
        deleteIcon.alt = "Delete Icon";
        deleteIcon.classList.add("delete_icon");

        deleteButton.classList.add("remove_product");
        deleteButton.name = "Remove";
        deleteButton.appendChild(deleteIcon);

        tableProductName.innerText = product.name;
        tableProductQuantity.innerText = parseInt(quantity);
        tableProductPrice.innerText = parseInt(product.price) * parseInt(quantity);

        tableRow.appendChild(tableProductName);
        tableRow.appendChild(tableProductQuantity);
        tableRow.appendChild(tableProductPrice);
        tableRow.appendChild(deleteButton);

        tableData.appendChild(tableRow);

        total += parseInt(product.price) * parseInt(quantity);
        cost.innerText = `${total} Rs`;

        function removeItem() {
            const currentPrice = parseInt(tableProductPrice.innerText);
            total -= currentPrice;
            cost.innerText = `${total} Rs`;
            tableRow.remove();
        }

        deleteButton.addEventListener("click", removeItem);
    }
}

function popErrorMessage(message) {
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.innerText = message;
        errorMessage.style.display = "block";
        setTimeout(() => errorMessage.style.display = "none", 3000);
}

// Generating Cards

let productContainer = document.getElementById("product_container");
let productDetails; 

async function getData() {
    const response = await fetch("./JSON/products.json");
    console.log(response)
    if(!response.ok){
        console.log("Failed to fetch file.")
    }
    else{
        const data = await response.json();
        return data;
    }
}

async function displayProductCards() {
    let productDetails = await getData();
    console.log(productDetails);

    for(let category in productDetails){
        // Category Heading
        const categoryHeading = document.createElement("h1");
        categoryHeading.classList.add("product_category");
        categoryHeading.innerText = category

        // Product container for each Category
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category_products_container");

        // Each Products in Category
        const products = productDetails[category]
        products.forEach(product => {
            // Product Card
            const productCard = document.createElement("div");
            productCard.classList.add("product_card");

            // Image
            const productImage = document.createElement("img");
            productImage.classList.add("product_image");
            productImage.src = product.image;
            productImage.alt = product.name;

            // Name
            const productName = document.createElement("p");
            productName.classList.add("product_name");
            productName.innerText = product.name;

            // Cost
            const productCost = document.createElement("div");
            productCost.classList.add("product_cost");

            // Cost Value and Currency
            const productCostValue = document.createElement("p");
            productCostValue.classList.add("product_cost_value");
            productCostValue.innerText = product.price;

            const productCostCurrency = document.createElement("p");
            productCostCurrency.classList.add("product_cost_currency");
            productCostCurrency.innerText = "Rs";

            // Quantity

            const productQuantity = document.createElement("input");
            productQuantity.type = "number";
            productQuantity.min = 1;
            productQuantity.max = 100;
            productQuantity.value = 1;
            productQuantity.name = "quantity";
            productQuantity.classList.add("product_quantity");

            // Button
            const addToCartButton = document.createElement("button");
            addToCartButton.name = "Add"
            addToCartButton.classList.add("add_to_cart_button");
            addToCartButton.innerText = "Add to Cart";
            
            addToCartButton.addEventListener("click", () => {
                let quantityValue = parseInt(productQuantity.value);

                if (quantityValue >= 1 && quantityValue <= 100) {
                    addToCart(product, quantityValue);
                    productQuantity.value = 1;
                } else {
                    popErrorMessage("Please enter a value between 1-100")
                    productQuantity.value = 1;
                }
            });

            // Appending

            // Cost Div
            productCost.appendChild(productCostValue);
            productCost.appendChild(productCostCurrency);

            // Card
            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(productCost);
            productCard.appendChild(productQuantity);
            productCard.appendChild(addToCartButton);

            // Category Container
            categoryContainer.appendChild(productCard);
        });
        productContainer.appendChild(categoryHeading);
        productContainer.appendChild(categoryContainer);

    }
}


// CHECKOUT PAGE JS

// Buttons
let checkoutBtn = document.getElementById("checkout");
let applyFavoriteBtn = document.getElementById("applyFavorite");
let addToFavoriteBtn = document.getElementById("addToFavorite");

// Checkout Page
let checkoutTable = document.getElementById("checkout_table_container");
let entireProductTable = document.getElementById("cart_table");

function checkout(){
    if(tableData.innerHTML !== ""){
        window.location.href = "Checkout Page.html";
        checkoutTable.appendChild(entireProductTable);
    }
    else{
        popErrorMessage("Cart is Empty")
    }
}
checkoutBtn.addEventListener("click", checkout)