
document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector('form').addEventListener('submit', function(event) {
        const inputs = document.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }
        });

        if (!isValid) {
            event.preventDefault();
            alert('Please fill in all fields');
        }
    });

    
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});
