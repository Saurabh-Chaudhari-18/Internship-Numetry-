document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsDiv = document.getElementById('cartItems');

    const products = [
        { id: '1', name: 'Wings of Fire', author: 'Dr. A P J Abdul Kalam', price: 350, image: './images/image.png' },
        { id: '2', name: 'The Life of Mahatma Gandhi', author: 'Louis Fischer', price: 500, image: './images/mahatma gandhi.jpg' },
        { id: '3', name: 'Shivaji the Great Maratha', author: 'Ranjit Desai', price: 420, image: './images/Shivaji Maharaj.jpg' }
    ];
    
    
    localStorage.setItem('products', JSON.stringify(products));

    
    const loginUser = (username, password) => {
        const user = JSON.parse(localStorage.getItem(username));
        if (user && user.password === password) {
            sessionStorage.setItem('loggedInUser', username);
            sessionStorage.setItem('loginTime', Date.now());
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password.');
        }
    };

   
    const registerUser = (username, password) => {
        if (localStorage.getItem(username)) {
            alert('Username already exists.');
        } else {
            localStorage.setItem(username, JSON.stringify({ username, password }));
            alert('Registration successful!');
            window.location.href = 'login.html';
        }
    };

    const addToCart = (productId) => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('Please log in first.');
            window.location.href = 'login.html';
            return;
        }
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (!cart[loggedInUser]) {
            cart[loggedInUser] = [];
        }
        cart[loggedInUser].push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
    };

    
    const logoutUser = () => {
        sessionStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('loginTime');
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    };

    
    const manageSession = () => {
        const loginTime = sessionStorage.getItem('loginTime');
        if (loginTime && (Date.now() - loginTime > 1800000)) { // 30 minutes
            logoutUser();
        }
    };

   
    const displayCartItems = () => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            window.location.href = 'login.html';
        } else {
            const cart = JSON.parse(localStorage.getItem('cart')) || {};
            const userCart = cart[loggedInUser] || [];
            const products = JSON.parse(localStorage.getItem('products')) || [];
            if (userCart.length === 0) {
                cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            } else {
                cartItemsDiv.innerHTML = userCart.map(productId => {
                    const product = products.find(p => p.id === productId);
                    if (product) {
                        return `<div class="cart-item">
                                    <img src="${product.image}" alt="${product.name}">
                                    <div>
                                        <h2>${product.name}</h2>
                                        <h4>${product.author}</h4>
                                        <p>Price: ₹${product.price}</p>
                                    </div>
                                </div>`;
                    }
                }).join('');
            }
        }
    };

   
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            loginUser(username, password);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            registerUser(username, password);
        });
    }

    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.closest('.product').getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }

    if (cartItemsDiv) {
        displayCartItems();
    }

    
    manageSession();
});
