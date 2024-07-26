document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    
    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart;
    };

  
    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const addToCart = (id, name, price, image) => {
        const cart = loadCart();
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, image, quantity: 1 });
        }
        saveCart(cart);
        alert(`${name} added to cart.`);
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const id = product.dataset.id;
            const name = product.dataset.name;
            const price = product.dataset.price;
            const image = product.querySelector('img').src;
            addToCart(id, name, price, image);
        });
    });
});
