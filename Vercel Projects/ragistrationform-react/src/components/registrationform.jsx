import React, { useState } from 'react';
import './RegistrationForm.css';

function RegistrationForm() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let errors = {};

        if (!name) {
            errors.name = "Name is required";
        }

        if (!username) {
            errors.username = "Username is required";
        }

        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!dob) {
            errors.dob = "Date of Birth is required";
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();
        if (Object.keys(errors).length === 0) {
            const user = { name, username, email, password, dob };

            fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                
                setName('');
                setUsername('');
                setEmail('');
                setPassword('');
                setDob('');
                
                alert("Registration successful!");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            setErrors(errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p>{errors.username}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <div>
                <label>Date of Birth:</label>
                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
                {errors.dob && <p>{errors.dob}</p>}
            </div>
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;
