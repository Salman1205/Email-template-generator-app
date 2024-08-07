
import React, { useState } from 'react';
import "../Css/login.css";
import { useNavigate } from 'react-router-dom';

const Login = ({loginCredentials, setLoginCredentials}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new URLSearchParams();
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch(`${process.env.REACT_APP_LOGIN_SIGNUP_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            
            console.log('Login successful:', data);
            setLoginCredentials(data);
            // Optionally navigate to a different page after login
            navigate('/profile');
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
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
