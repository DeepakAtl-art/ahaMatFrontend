import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import wallpaper from '../../../assets/gym.jpg';
import Toast from '../../Toast/Toast';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showToast('Please enter both email and password.');
      return;
    }
  
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseURL}/api/auth/login`, {
        email,
        password
      });
  
      const token = response.data.token;
      localStorage.setItem('token', token);
      showToast('Login successful!', 'success');

      const profileRes = await axios.get(`${baseURL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const userMetrics = profileRes.data;
      console.log(userMetrics);
      
  
      if (userMetrics?.height) {
        setTimeout(() => navigate('/home'), 1500);
      } else {
        setTimeout(() => navigate('/age'), 1500);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed.';
      showToast(errMsg, 'error');
    }
  
    //   setTimeout(() => navigate('/age'), 1500);
    // } catch (error) {
    //   const errMsg = error.response?.data?.message || 'Login failed.';
    //   showToast(errMsg, 'error');
    // }
  };
  
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="image-section">
            <img src={wallpaper} alt="gym" className="background-img" />
            <div className="tab">
              <span className="active">Login</span>
              <span className="inactive" onClick={() => navigate('/')}>Sign up</span>
            </div>
            <div className="text-overlay">
              <h1>WELCOME BACK,</h1>
              <p>ENTER YOUR CREDENTIALS BELOW OR LOGIN WITH ANOTHER ACCOUNT</p>
            </div>
          </div>
          <div className="form-section">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="buttons">
              <div className="social-buttons">
                <button className="icon-button">F</button>
                <button className="icon-button">G</button>
              </div>
              <button className="signup-button" onClick={handleLogin}>Login →</button>
            </div>
        </div>
      </div>

      {toast.message && <Toast message={toast.message} onClose={() => setToast({ message: '', type: '' })} type={toast.type} />}
    </>
  );
}

export default LoginPage;
