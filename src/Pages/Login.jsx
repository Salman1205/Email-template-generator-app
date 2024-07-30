import React from 'react';
import "../Css/login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };
    
        try {
            const response = await fetch('https://email-template-generator-backend.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                console.log('Login successful');
                // Handle success
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
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
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
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
}

export default Login;