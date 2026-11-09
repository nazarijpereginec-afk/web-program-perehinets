const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const payButton = document.getElementById("payButton");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<h2>Корзина пуста</h2>";
        cartTotal.textContent = "";
        return;
    }
    let total = 0;
    cart.forEach(function (item) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const product = document.createElement("div");
        product.className = "cart-product";
        product.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h2>${item.name}</h2>
                <p>Ціна: ${item.price.toLocaleString("uk-UA")} грн</p>
                <p>Кількість: ${item.quantity}</p>
                <p>Сума: ${itemTotal.toLocaleString("uk-UA")} грн</p>
                <button class="remove-button" data-id="${item.id}">
                    Видалити
                </button>
            </div>
        `;

        cartItems.appendChild(product);
    });

    cartTotal.textContent = "Загальна сума: " + total.toLocaleString("uk-UA") + " грн";

    document.querySelectorAll(".remove-button").forEach(function (button) {
        button.addEventListener("click", function () {
            const id = button.dataset.id;

            cart = cart.filter(function (item) {
                return item.id !== id;
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            showCart();
        });
    });
}

payButton.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Корзина пуста!");
    } else {
        alert("Дякуємо за замовлення!");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        showCart();
    }
});

showCart();