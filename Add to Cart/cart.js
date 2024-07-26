document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart');

    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart;
    };

    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const renderCart = () => {
        const cart = loadCart();
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.textContent = 'Your cart is empty.';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h2>${item.name}</h2>
                        <p>Price: ₹${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                    </div>
                    <img src="${item.image}" alt="${item.name}">
                `;
                cartContainer.appendChild(cartItem);
            });
        }

        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                removeFromCart(id);
            });
        });
    };

    const removeFromCart = (id) => {
        let cart = loadCart();
        cart = cart.filter(item => item.id !== id);
        saveCart(cart);
        renderCart();
    };

    renderCart();
});
