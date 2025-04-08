import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserMetrics } from '../../../context/useUserMetrics';
import './Gender.css';

function Gender() {
  const [selectedGender, setSelectedGender] = useState('');
  const navigate = useNavigate();
  const { updateMetric } = useUserMetrics();

  const handleSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleNext = () => {
    if (selectedGender) {
      updateMetric('gender', selectedGender);
      navigate('/goal');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>TELL US ABOUT YOURSELF!</h1>
        <p>TO GIVE YOU A BETTER EXPERIENCE WE NEED<br />TO KNOW YOUR GENDER</p>
      </div>
      <div className="gender-options">
        <div
          className={`gender-btn ${selectedGender === 'male' ? 'selected' : ''}`}
          onClick={() => handleSelect('male')}
        >
          <span className="gender-icon">&#9794;</span>
          <span className="gender-label">Male</span>
        </div>
        <div
          className={`gender-btn ${selectedGender === 'female' ? 'selected' : ''}`}
          onClick={() => handleSelect('female')}
        >
          <span className="gender-icon">&#9792;</span>
          <span className="gender-label">Female</span>
        </div>
      </div>
      <button className="next-btn" onClick={handleNext} disabled={!selectedGender}>
        Next &rsaquo;
      </button>
    </div>
  );
}

export default Gender;
