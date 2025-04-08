import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserMetrics } from '../../../context/useUserMetrics.js';
import './Height.css';

function Height() {
  const [height, setHeight] = useState(167);
  const minHeight = 160;
  const maxHeight = 180;
  const navigate = useNavigate();
  const { updateMetric } = useUserMetrics();

  const handleWheel = (e) => {
    if (e.deltaY > 0 && height < maxHeight) {
      setHeight(height + 1);
    } else if (e.deltaY < 0 && height > minHeight) {
      setHeight(height - 1);
    }
  };

  const handleNext = () => {
    updateMetric('height', height);
    navigate('/activityLevel');
  };

  const visibleHeights = [];
  for (let i = height - 3; i <= height + 3; i++) {
    if (i >= minHeight && i <= maxHeight) visibleHeights.push(i);
  }

  return (
    <div className="height-container">
     <div className="highthead">
     <h2 className="height-title">WHAT'S YOUR HEIGHT?</h2>
     <p className="height-subtitle">THIS HELPS US CREATE YOUR PERSONALIZED PLAN</p>
     </div>

      <div className="height-wheel" onWheel={handleWheel}>
        {visibleHeights.map((h) => (
          <div
            key={h}
            className={`height-item ${h === height ? 'active' : ''}`}
          >
            {h === height ? `${h} cm` : h}
          </div>
        ))}
      </div>

      <div className="weight-footer">
        <button className="back-btn" onClick={() => navigate(-1)}>{"<"}</button>
        <button className="next-btn" onClick={handleNext}>Next &rarr;</button>
      </div>
    </div>
  );
}

export default Height;
