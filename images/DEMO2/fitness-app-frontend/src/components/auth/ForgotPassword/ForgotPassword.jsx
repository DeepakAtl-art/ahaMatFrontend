import React from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <button className="back-btn">&larr;</button>

      <h2 className="title">FORGOT PASSWORD?</h2>
      <p className="subtitle">
        ENTER YOUR INFORMATIONS BELOW OR<br />
        LOGIN WITH A OTHER ACCOUNT
      </p>

      <input type="email" placeholder="Email" className="input-field" />

      <p className="try-another">Try another way</p>

      <button className="send-btn">Send</button>
    </div>
  );
};

export default ForgotPassword;