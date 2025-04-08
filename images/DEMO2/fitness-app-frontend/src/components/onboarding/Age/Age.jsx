import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserMetrics } from '../../../context/useUserMetrics';
import './Age.css';

function Age() {
  const minAge = 10;
  const maxAge = 80;
  const [selectedAge, setSelectedAge] = useState(36);
  const navigate = useNavigate();
  const { updateMetric } = useUserMetrics();

  const handleWheel = (e) => {
    if (e.deltaY < 0 && selectedAge > minAge) {
      setSelectedAge((prev) => prev - 1);
    } else if (e.deltaY > 0 && selectedAge < maxAge) {
      setSelectedAge((prev) => prev + 1);
    }
  };

  const renderAges = () => {
    const ages = [];
    for (let i = selectedAge - 3; i <= selectedAge + 3; i++) {
      if (i >= minAge && i <= maxAge) {
        ages.push(
          <div key={i} className={`age-item ${i === selectedAge ? 'active' : ''}`}>
            {i}
          </div>
        );
      }
    }
    return ages;
  };

  const handleNext = () => {
    updateMetric('age', selectedAge);
    navigate('/gender'); 
  };

  return (
    <div className="age-container">
      <div className="age-card">
        <div className="text">
        <h1 className="age-title">HOW OLD ARE YOU?</h1>
        <p className="age-subtitle">THIS HELPS US CREATE YOUR PERSONALIZED PLAN</p>
        </div>

        <div className="age-wheel" onWheel={handleWheel}>
          <div className="age-list">{renderAges()}</div>
        </div>

       <div className="next">
       <button className="next-btn" onClick={handleNext}>Next ❯</button>
       </div>
      </div>
    </div>
  );
}

export default Age;
