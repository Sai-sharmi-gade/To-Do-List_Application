import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true
        setErrorMessage(''); // Clear previous errors
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/home'); // Use navigate for redirection
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed!';
            setErrorMessage(message);
            console.error('Login error:', message, error.response?.data); // Log more details
        } finally {
            setIsLoading(false); // Set loading back to false
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLoginSubmit}>
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={isLoading}> {/* Disable button while loading */}
                    {isLoading ? 'Logging in...' : 'Login'} {/* Show loading message */}
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </form>
        </div>
    );
};

export default Login;