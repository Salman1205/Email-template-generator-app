import React, { useState } from 'react';
import "../Css/login.css";
import { useNavigate } from 'react-router-dom';

const Login = ({ loginCredentials, setLoginCredentials }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error messages

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

            const data = await response.json();
            console.log('Response data:', data); // Log response data

            if (response.ok && data.message === 'Login successful!') {
                console.log('Login successful:', data);
                setLoginCredentials(data);
                navigate('/profile');
            } else {
                setError(data.error || 'Incorrect email or password.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="fullScreen">
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
                                placeholder="email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                        {error && <div className="error-message">{error}</div>} {/* Display error message */}
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
        </div>
    );
};

export default Login;