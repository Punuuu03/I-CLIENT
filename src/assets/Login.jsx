import React, { useState } from "react";
import './Login.css'; // Ensure this is linked correctly
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import google from '../../assets/Google.svg';
import facebook from '../../assets/Facebook.svg';
import apple from '../../assets/Apple.svg';
import logo from '../../assets/logo.jpg';
import eye from '../../assets/Eye.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://i-server-eight.vercel.app/branch/login', { email, password });
        const { branch } = response.data;
  
        if (branch) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          navigate(`/Component/Branch${branch}/Dashboard/Dashboard`);
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Invalid login', error);
        alert('Login failed');
      }
    };
    return (
        <div id='login-body'>
        <div id="login-container" className="login-container">
            <div id="login-card" className="login-card">
                <div id="login-form" className="login-form">
                    <div id="loginlogo" className="logo">
                        <img src={logo} alt="Logo" id="logo-image" className="logo-image" />
                        <span id="logo-text">New Eye Care</span>
                    </div>
                    <h2 id="login-heading">Login</h2>
                    <p id="login-subtitle" className="subtitle">Login to access your account</p>
                    <form onSubmit={handleSubmit}>
                        <div id="email-group" className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
                        </div>
                        <div id="password-group" className="input-group">
                            <label htmlFor="password">Password</label>
                            <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
                        </div>
                        <div id="remember-forgot" className="remember-forgot">
                            <label htmlFor="remember-me">
                                <input type="checkbox" id="remember-me" />
                                Remember me
                            </label>
                            <Link id="forgot-password-link" to="/forgot-password">Forgot Password?</Link>
                        </div>
                        <button type="submit" id="login-button" className="login-button">Login</button>
                    </form>
                    <p id="signup-link" className="signup-link">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                    <div id="divider" className="divider">-----------------------------Or login with---------------------------</div>
                    <div id="social-login" className="social-login">
                        <button id="facebook-button" className="social-button fb">
                            <img src={facebook} alt="Facebook" id="facebook-icon" className="social-icon" />
                        </button>
                        <button id="google-button" className="social-button google">
                            <img src={google} alt="Google" id="google-icon" className="social-icon" />
                        </button>
                        <button id="apple-button" className="social-button apple">
                            <img src={apple} alt="Apple" id="apple-icon" className="social-icon" />
                        </button>
                    </div>
                </div>
                <div id="login-image" className="login-image">
                    <img src={eye} alt="Eye" id="login-eye-image" />
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;