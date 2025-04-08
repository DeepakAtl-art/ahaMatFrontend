import React from 'react';
import './Toast.css';

const Toast = ({ message, onClose, type = 'error' }) => {
  return (
    <div className={`toast-container ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>x</button>
    </div>
  );
};

export default Toast;
