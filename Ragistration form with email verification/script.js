document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('registrationForm')) {
        document.getElementById('sendOtpButton').addEventListener('click', sendOtp);
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            validateForm();
        });

        function clearErrorMessages() {
            var errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(function(error) {
                error.style.display = 'none';
            });
        }

        function displayError(elementId, message) {
            var element = document.getElementById(elementId);
            element.innerText = message;
            element.style.display = 'block';
        }

        function generateOtp() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        }

        function sendOtp() {
            var email = document.getElementById('email').value;

            if (email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                displayError('emailError', 'Enter a valid email to send OTP.');
                return;
            }

            var otp = generateOtp();
            localStorage.setItem('otp', otp);
            document.getElementById('otpDisplay').innerText = 'Your OTP is: ' + otp; // Displaying OTP for demo
        }

        function validateForm() {
            var fullName = document.getElementById('fullName').value;
            var email = document.getElementById('email').value;
            var otp = document.getElementById('otp').value;
            var mobile = document.getElementById('mobile').value;
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;

            var isValid = true;

            clearErrorMessages();

            // Full Name validation
            if (fullName.trim() === '') {
                isValid = false;
                displayError('fullNameError', 'Full Name is required.');
            } else if (fullName.trim().length < 5) {
                isValid = false;
                displayError('fullNameError', 'Full Name must be at least 5 characters long.');
            }

            // Email validation
            if (email.trim() === '') {
                isValid = false;
                displayError('emailError', 'Email ID is required.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                isValid = false;
                displayError('emailError', 'Email is invalid.');
            }

            // OTP validation
            if (otp.trim() === '') {
                isValid = false;
                displayError('otpError', 'OTP is required.');
            } else if (otp !== localStorage.getItem('otp')) {
                isValid = false;
                displayError('otpError', 'Invalid OTP.');
            }

            // Mobile No validation
            if (mobile.trim() === '') {
                isValid = false;
                displayError('mobileError', 'Mobile No is required.');
            } else if (!/^[789]\d{9}$/.test(mobile)) {
                isValid = false;
                displayError('mobileError', 'Mobile No must be a 10-digit number starting with 7, 8, or 9.');
            }

            // Username validation
            if (username.trim() === '') {
                isValid = false;
                displayError('usernameError', 'Username is required.');
            } else if (username.trim().length < 5 || username.trim().length > 15) {
                isValid = false;
                displayError('usernameError', 'Username must be between 5 and 15 characters long.');
            }

            // Password validation
            if (password.trim() === '') {
                isValid = false;
                displayError('passwordError', 'Password is required.');
            } else {
                let passwordErrors = [];
                if (password.length < 8) passwordErrors.push('Password must be at least 8 characters long.');
                if (!/[a-z]/.test(password)) passwordErrors.push('Password must include a lowercase letter.');
                if (!/[A-Z]/.test(password)) passwordErrors.push('Password must include an uppercase letter.');
                if (!/[0-9]/.test(password)) passwordErrors.push('Password must include a number.');
                if (!/[!@#$%^&*]/.test(password)) passwordErrors.push('Password must include a special character.');
                if (passwordErrors.length > 0) {
                    isValid = false;
                    displayError('passwordError', passwordErrors.join(' '));
                }
            }

            if (isValid) {
                // Clear OTP from local storage
                localStorage.removeItem('otp');

                // Show success message
                alert("User registered successfully!\nThank you for registration");
                document.getElementById('successMessage').innerHTML = "User registered successfully!<br>Thank you for registration";
                document.getElementById('successMessage').style.display = 'block';
            }
        }

        function togglePassword() {
            var passwordInput = document.getElementById('password');
            var toggleIcon = document.querySelector('.toggle-password');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.innerHTML = '&#128065;';
            } else {
                passwordInput.type = 'password';
                toggleIcon.innerHTML = '&#128065;';
            }
        }
    }
});
