import React, { useState } from 'react';
import './ActivityLevel.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserMetrics } from '../../../context/useUserMetrics';
import Toast from '../../Toast/Toast';

function ActivityLevel() {
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const { metrics, updateMetric } = useUserMetrics();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const isSelectable = (level) => ['Beginner', 'Intermediate', 'Advance'].includes(level);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

       await axios.post(
        `${baseURL}/api/user/metrics`,
        {
          ...metrics,
          activityLevel: selectedLevel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast('Metrics saved!', 'success');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || 'Something went wrong.';
      showToast(errorMsg, 'error');
    }
  };


  return (
    <>
      <div className="container">
        <div className="card">
          <div className="acthead">
          <h1 className="title">YOUR REGULAR PHYSICAL ACTIVITY LEVEL?</h1>
          <p className="subtitle">THIS HELPS US CREATE YOUR PERSONALIZED PLAN</p>
          </div>
          <div className="levels">
            {['Rookie', 'Beginner', 'Intermediate', 'Advance', 'True Beast'].map((level, index) => {
              let className = 'level';
              if (selectedLevel === level) className += ' selected';
              else if (!isSelectable(level)) className += ' disabled';

              return (
                <div
                  key={index}
                  className={className}
                  onClick={() => {
                    if (isSelectable(level)) {
                      setSelectedLevel(level);
                      updateMetric('activityLevel', level);
                    }
                  }}
                >
                  {level}
                </div>
              );
            })}
          </div>
          <div className="buttons">
          <button className="back-btn" onClick={() => navigate(-1)}>{'←'}</button>
            <button className="start-button" onClick={handleSubmit}>Start ➤</button>
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

export default ActivityLevel;
