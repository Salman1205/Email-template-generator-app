import React, { useState } from 'react';
import "../Css/login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting the default way

        try {
            const response = await fetch('https://email-template-generator-backend.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            // Optionally navigate to a different page after login
            // navigate('/profile');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login to Your Account</h1>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <div id="form-feedback" className="hidden">Login successful!</div>
                </form>
                <p>Don't have an account? <span 
                    onClick={() => navigate("/signup")}
                    style={{
                        cursor: "pointer",
                        color: "blue",
                    }}
                >Sign up here</span></p>
            </div>
        </div>
    );
};

export default Login;
