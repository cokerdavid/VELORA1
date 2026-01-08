// SIGN UP
function signupUser() {
    let user = {
        name: name.value,
        email: email.value,
        password: password.value,
        orders: []
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Account created!");
    window.location.href = "index.html";
    return false;
}

// LOGIN
function loginUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Create an account first");

    if (email.value === user.email && password.value === user.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "shop.html";
    } else alert("Invalid login");
    return false;
}

// HAMBURGER
function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

// CART
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(i => i.name === name);

    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let div = document.getElementById("cart");
    let total = 0;
    div.innerHTML = "";

    cart.forEach((item, i) => {
        total += item.price * item.qty;
        div.innerHTML += `
            <div class="item">
                ${item.name} x${item.qty}
                <button onclick="removeItem(${i})">✖</button>
            </div>`;
    });

    div.innerHTML += `<h3>Total: $${total}</h3>
    <button onclick="location.href='checkout.html'">Checkout</button>`;
}

function removeItem(i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// CHECKOUT → SAVE ORDER
function completeOrder() {
    let user = JSON.parse(localStorage.getItem("user"));
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    user.orders.push({
        date: new Date().toLocaleDateString(),
        items: cart
    });

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.removeItem("cart");

    alert("Order placed!");
    window.location.href = "profile.html";
}

// PROFILE
function loadProfile() {
    let user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("username").innerText =
        "Welcome, " + user.name;

    let ordersDiv = document.getElementById("orders");

    if (user.orders.length === 0) {
        ordersDiv.innerHTML = "<p>No past purchases.</p>";
        return;
    }

    user.orders.forEach(order => {
        let html = `<p><strong>${order.date}</strong></p>`;
        order.items.forEach(i => {
            html += `<p>${i.name} x${i.qty}</p>`;
        });
        ordersDiv.innerHTML += html + "<hr>";
    });
}