
// ==============================
// PRODUCT DATA
// ==============================

const products = [

    {
        id: 1,
        name: "Pink Rose Paradise",
        category: "Roses",
        price: 899,
        rating: "★★★★★",
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=600"
    },

    {
        id: 2,
        name: "Birthday Bliss",
        category: "Birthday",
        price: 1199,
        rating: "★★★★★",
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600"
    },

    {
        id: 3,
        name: "White Elegance",
        category: "Elegant",
        price: 999,
        rating: "★★★★★",
        badge: "New",
        image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600"
    },

    {
        id: 4,
        name: "Colorful Dreams",
        category: "Mixed",
        price: 1299,
        rating: "★★★★★",
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600"
    },

    {
        id: 5,
        name: "Love Forever",
        category: "Roses",
        price: 1499,
        rating: "★★★★★",
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600"
    },

    {
        id: 6,
        name: "Sunshine Bouquet",
        category: "Birthday",
        price: 799,
        rating: "★★★★★",
        badge: "Special",
        image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=600"
    },

    {
        id: 7,
        name: "Pure White Magic",
        category: "Elegant",
        price: 1099,
        rating: "★★★★★",
        badge: "Elegant",
        image: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=600"
    },

    {
        id: 8,
        name: "Floral Fantasy",
        category: "Mixed",
        price: 1399,
        rating: "★★★★★",
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600"
    }

];


// ==============================
// DISPLAY PRODUCTS
// ==============================

const productGrid = document.getElementById("productGrid");

function displayProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        productGrid.innerHTML = "<p>No products found.</p>";

        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy">

                <span class="product-badge">
                    ${product.badge}
                </span>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="product-rating">
                    ${product.rating}
                </div>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <button
                        class="add-cart"
                        data-id="${product.id}">

                        + Add Cart

                    </button>

                </div>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


// Display all products when website loads

displayProducts(products);


// ==============================
// FILTER PRODUCTS
// ==============================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        // Remove active class from all buttons

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button

        this.classList.add("active");

        const category = this.dataset.filter;

        if (category === "All") {

            displayProducts(products);

        } else {

            const filteredProducts = products.filter(product => {

                return product.category === category;

            });

            displayProducts(filteredProducts);

        }

    });

});


// ==============================
// CATEGORY NAVIGATION
// ==============================

const categoryLinks = document.querySelectorAll(
    ".category-overlay a"
);

categoryLinks.forEach(link => {

    link.addEventListener("click", function() {

        const category = this.dataset.category;

        filterButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });

        const filteredProducts = products.filter(product => {

            return product.category === category;

        });

        displayProducts(filteredProducts);

    });

});


// ==============================
// ADD TO CART
// ==============================

let cartCount = 0;

const cartCounter = document.getElementById("cartCount");

const toast = document.getElementById("toast");

let toastTimer;

productGrid.addEventListener("click", function(event) {

    if (event.target.classList.contains("add-cart")) {

        const productId = Number(event.target.dataset.id);

        const selectedProduct = products.find(product => {

            return product.id === productId;

        });

        if (selectedProduct) {

            cartCount++;

            cartCounter.textContent = cartCount;

            showToast(
                selectedProduct.name + " added to cart! 🌸"
            );

        }

    }

});


// ==============================
// TOAST NOTIFICATION
// ==============================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ==============================
// MOBILE NAVIGATION
// ==============================

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {

        menuBtn.textContent = "✕";

    } else {

        menuBtn.textContent = "☰";

    }

});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

    });

});


// ==============================
// NEWSLETTER SUBSCRIPTION
// ==============================

const newsletterForm = document.getElementById("newsletterForm");

const emailInput = document.getElementById("emailInput");

const newsletterMessage = document.getElementById(
    "newsletterMessage"
);

newsletterForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();

    if (email === "") {

        newsletterMessage.textContent =
            "Please enter your email address.";

        return;

    }

    newsletterMessage.textContent =
        "Thank you for subscribing! 💗";

    newsletterForm.reset();

});
