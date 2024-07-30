import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ loginCredentials, setLoginCredentials }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { email, password };
        try {
            const response = await fetch('https://email-template-generator-backend.vercel.app/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login success:', result);
                navigate('/profile');
            } else {
                const errorData = await response.json();
                console.error('Login error:', errorData);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;
