import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import wallpaper from '../../../assets/gym.jpg';
import Toast from '../../Toast/Toast';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      showToast('Please enter both email and password.');
      return;
    }
    try {
      const baseurl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseurl}/api/auth/signup`, {
        email,
        password
      });

      console.log('Registration successful:', response.data);
      showToast('Registration successful!', 'success');

      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Registration failed.';
      console.error('Error registering user:', errMsg);
      showToast(errMsg, 'error');
    }
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="image-section">
            <img src={wallpaper} alt="gym" className="background-img" />
            <div className="tab">
              <span className="inactive" onClick={() => navigate('/login')}>Login</span>
              <span className="active">Sign up</span>
            </div>
            <div className="text-overlay">
              <h1>HELLO ROOKIES,</h1>
              <p>ENTER YOUR INFORMATION BELOW OR LOGIN WITH ANOTHER ACCOUNT</p>
            </div>
          </div>
          <div className="form-section">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="buttons">
            <div className="social-buttons">
              <button className="icon-button">F</button>
              <button className="icon-button">G</button>
            </div>
            <button className="signup-button" onClick={handleRegister}>Sign up →</button>
          </div>
        </div>
      </div>

      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: '' })}
        />
      )}
    </>
  );
}

export default RegisterPage;
