import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { username, password });
            console.log('Signup success:', response.data.message);
            navigate('/login'); // Use navigate
        } catch (error) {
            const message = error.response?.data?.message || 'Signup failed!';
            setErrorMessage(message);
            console.error('Signup error:', message, error.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default SignUp;