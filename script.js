
    const buttons = document.querySelectorAll(".Add");
    const cartList = document.querySelector(".prodeuct-added");
    let cartItems = {};
    let totalAmount = 0;

    
    const totalDisplay = document.createElement("div");
    totalDisplay.classList.add("total-display");
    totalDisplay.textContent = "Total: ₹0.00";
    cartList.parentElement.appendChild(totalDisplay);

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const parent = button.closest(".each-service");
            const serviceName = parent.querySelector("p").textContent.trim();
            const servicePriceText = parent.querySelector("span").textContent.trim();
            const itemId = button.id;

           
            const servicePrice = parseFloat(servicePriceText.replace(/[^\d.]/g, ""));

            if (!cartItems[itemId]) {
                
                const li = document.createElement("li");
                li.classList.add("added");
                li.setAttribute("data-id", itemId);
                li.innerHTML = `<span>${Object.keys(cartItems).length + 1}</span> <span>${serviceName}</span> <span>${servicePriceText}</span>`;
                cartList.appendChild(li);
                cartItems[itemId] = { li, price: servicePrice };
                totalAmount += servicePrice;
            } else {
                
                cartList.removeChild(cartItems[itemId].li);
                totalAmount -= cartItems[itemId].price;
                delete cartItems[itemId];
                
                Array.from(cartList.children).forEach((li, index) => {
                    li.querySelector("span").textContent = index + 1;
                });
            }

            
            totalDisplay.textContent = `Total: ₹${totalAmount.toFixed(2)}`;
        });
    });

