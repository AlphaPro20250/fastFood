const cart = [];
let totalPrice = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("checkout-btn").addEventListener("click", checkout);
});

function orderNow(item, price) {
    cart.push({ item, price });
    totalPrice += price;
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    const total = document.getElementById("total-price");
    cartList.innerHTML = "";

    cart.forEach((product, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${product.item} - $${product.price.toFixed(2)}`;
        
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.dataset.index = index;
        
        listItem.appendChild(removeBtn);
        cartList.appendChild(listItem);
    });
    
    total.textContent = `$${totalPrice.toFixed(2)}`;
}

document.getElementById("cart-items").addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-btn")) {
        removeItem(event.target.dataset.index);
    }
});

function removeItem(index) {
    index = parseInt(index, 10);
    if (index >= 0 && index < cart.length) {
        totalPrice -= cart[index].price;
        cart.splice(index, 1);
        updateCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Thank you for your order! Total amount: $${totalPrice.toFixed(2)}`);
    cart.length = 0;
    totalPrice = 0;
    updateCart();
}
