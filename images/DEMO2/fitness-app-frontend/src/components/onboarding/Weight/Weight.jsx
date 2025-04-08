import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserMetrics } from '../../../context/useUserMetrics';
import './Weight.css';

function Weight() {
  const [weight, setWeight] = useState(54);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { updateMetric } = useUserMetrics();

  const handleSliderChange = (e) => {
    setWeight(e.target.value);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 150);
  };

  const handleNext = () => {
    updateMetric('weight', Number(weight));
    navigate('/height');
  };

  return (
    <div className="weight-container">
      <div className="weight-header">
        <h2>WHAT'S YOUR WEIGHT?</h2>
        <p>YOU CAN ALWAYS CHANGE THIS LATER</p>
      </div>

      <div className="weight-display">
        <span className={`weight-number ${animate ? 'pop' : ''}`}>{weight}</span>
        <span className="weight-unit">kg</span>
      </div>

      <div className="slider-wrapper">
        <input
          type="range"
          min="30"
          max="150"
          value={weight}
          onChange={handleSliderChange}
          className="weight-slider"
        />
      </div>

      <div className="weight-footer">
        <button className="back-btn" onClick={() => navigate(-1)}>{"<"}</button>
        <button className="next-btn" onClick={handleNext}>Next &rarr;</button>
      </div>
    </div>
  );
}

export default Weight;
