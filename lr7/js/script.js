const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

const products = {
    lg: {
        name: "LG 24MP400",
        price: 3999,
        image: "img/lg_24mp400.jpeg"
    },
    dell: {
        name: "Dell UltraSharp",
        price: 27546,
        image: "img/dell_ultra_sharp.jpeg"
    },
    asus: {
        name: "ASUS ProArt",
        price: 33419,
        image: "img/asus.jpeg"
    }
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function openModal(content) {
    modalContent.innerHTML = content;
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

document.querySelectorAll("[data-product]").forEach(function (button) {
    button.addEventListener("click", function () {
        const productId = button.dataset.product;
        const product = products[productId];

        openModal(`
            <h2>Вкажіть кількість:</h2>
            <p>${product.name}</p>
            <input type="number" id="productQuantity" min="1" value="1">
            <br>
            <button id="addProduct">Додати до корзини</button>
            <button id="cancelAdd">Скасувати</button>
        `);

        document.getElementById("addProduct").addEventListener("click", function () {
            const quantity = Number(document.getElementById("productQuantity").value);
            if (!Number.isInteger(quantity) || quantity < 1) {
                alert("Вкажіть правильну кількість товару!");
                return;
            }
            const existingProduct = cart.find(function (item) {
                return item.id === productId;
            });

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }
            saveCart();
            openModal(`
                <h2>Товар додано!</h2>
                <button id="goToCart">Перейти у корзину</button>
                <button id="continueShopping">Повернутись до покупок</button>
            `);
            document.getElementById("goToCart").addEventListener("click", function () {
                window.location.href = "cart.html";
            });
            document.getElementById("continueShopping").addEventListener("click", closeModal);
        });
        document.getElementById("cancelAdd").addEventListener("click", closeModal);
    });
});

cartIcon.addEventListener("click", function () {
    if (cart.length === 0) {
        openModal(`
            <h2>Корзина пуста</h2>
            <button id="closeEmptyCart">Закрити</button>
        `);

        document.getElementById("closeEmptyCart").addEventListener("click", closeModal);
    } else {
        window.location.href = "cart.html";
    }
});

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

updateCartCount();