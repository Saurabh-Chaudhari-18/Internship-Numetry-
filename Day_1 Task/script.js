document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('registrationForm')) {
        const urlParams = new URLSearchParams(window.location.search);
        const fullName = urlParams.get('fullName');
        const email = urlParams.get('email');
        const mobile = urlParams.get('mobile');
        const username = urlParams.get('username');
        const editIndex = urlParams.get('editIndex');

        if (fullName && email && mobile && username) {
            document.getElementById('fullName').value = fullName;
            document.getElementById('email').value = email;
            document.getElementById('mobile').value = mobile;
            document.getElementById('username').value = username;
            document.getElementById('registrationForm').dataset.editIndex = editIndex;
        }

        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault();

            var fullName = document.getElementById('fullName').value;
            var email = document.getElementById('email').value;
            var mobile = document.getElementById('mobile').value;
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;

            var isValid = true;

            document.getElementById('fullNameError').style.display = 'none';
            document.getElementById('emailError').style.display = 'none';
            document.getElementById('mobileError').style.display = 'none';
            document.getElementById('usernameError').style.display = 'none';
            document.getElementById('passwordError').style.display = 'none';

            if (fullName.trim() === '') {
                isValid = false;
                document.getElementById('fullNameError').innerText = 'Full Name is required.';
                document.getElementById('fullNameError').style.display = 'block';
            } else if (fullName.trim().length < 5) {
                isValid = false;
                document.getElementById('fullNameError').innerText = 'Full Name must be at least 5 characters long.';
                document.getElementById('fullNameError').style.display = 'block';
            }

            if (email.trim() === '') {
                isValid = false;
                document.getElementById('emailError').innerText = 'Email ID is required.';
                document.getElementById('emailError').style.display = 'block';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                isValid = false;
                document.getElementById('emailError').innerText = 'Email is invalid.';
                document.getElementById('emailError').style.display = 'block';
            }

            if (mobile.trim() === '') {
                isValid = false;
                document.getElementById('mobileError').innerText = 'Mobile No is required.';
                document.getElementById('mobileError').style.display = 'block';
            } else if (!/^[789]\d{9}$/.test(mobile)) {
                isValid = false;
                document.getElementById('mobileError').innerText = 'Mobile No must be a 10-digit number starting with 7, 8, or 9.';
                document.getElementById('mobileError').style.display = 'block';
            }

            if (username.trim() === '') {
                isValid = false;
                document.getElementById('usernameError').innerText = 'Username is required.';
                document.getElementById('usernameError').style.display = 'block';
            } else if (username.trim().length < 5 || username.trim().length > 15) {
                isValid = false;
                document.getElementById('usernameError').innerText = 'Username must be between 5 and 15 characters long.';
                document.getElementById('usernameError').style.display = 'block';
            }

            if (password.trim() === '') {
                isValid = false;
                document.getElementById('passwordError').innerText = 'Password is required.';
                document.getElementById('passwordError').style.display = 'block';
            } else {
                let passwordErrors = [];
                if (password.length < 8) passwordErrors.push('Password must be at least 8 characters long.');
                if (!/[a-z]/.test(password)) passwordErrors.push('Password must include a lowercase letter.');
                if (!/[A-Z]/.test(password)) passwordErrors.push('Password must include an uppercase letter.');
                if (!/[0-9]/.test(password)) passwordErrors.push('Password must include a number.');
                if (!/[!@#$%^&*]/.test(password)) passwordErrors.push('Password must include a special character.');
                if (passwordErrors.length > 0) {
                    isValid = false;
                    document.getElementById('passwordError').innerText = passwordErrors.join(' ');
                    document.getElementById('passwordError').style.display = 'block';
                }
            }

            if (isValid) {
                var user = { fullName, email, mobile, username, password };

                
                if (this.dataset.editIndex) {
                    let editIndex = parseInt(this.dataset.editIndex);
                    updateLocalStorage(user, editIndex);
                    this.removeAttribute('data-edit-index');
                } else {
                    saveToLocalStorage(user);
                }

                this.reset();
                alert("User registered successfully! Thank you for registration");
            }
        });
    }

    if (document.getElementById('dataTable')) {
        loadFromLocalStorage();

        document.getElementById('clearDataBtn').addEventListener('click', function() {
            clearLocalStorage();
        });
    }
});

function saveToLocalStorage(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    loadFromLocalStorage();
}

function updateLocalStorage(user, index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
    loadFromLocalStorage();
}

function loadFromLocalStorage() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    users.forEach((user, index) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>${user.username}</td>
            <td>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function clearLocalStorage() {
    localStorage.removeItem('users');
    loadFromLocalStorage();
}

function editUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users[index];
    let queryString = `registration.html?fullName=${encodeURIComponent(user.fullName)}&email=${encodeURIComponent(user.email)}&mobile=${encodeURIComponent(user.mobile)}&username=${encodeURIComponent(user.username)}&editIndex=${index}`;
    window.location.href = queryString;
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadFromLocalStorage();
}
