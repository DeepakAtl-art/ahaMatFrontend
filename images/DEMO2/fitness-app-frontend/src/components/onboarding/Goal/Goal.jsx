import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserMetrics } from '../../../context/useUserMetrics';
import './Goal.css';

const goals = ['Lose weight', 'Get fitter', 'Gain more flexible', 'Build strength', 'Stay active'];

function Goal() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const { updateMetric } = useUserMetrics();

  const handleScroll = () => {
    const container = listRef.current;
    const children = Array.from(container.children);
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.top + childRect.height / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentIndex(closestIndex);
  };

  const scrollToIndex = (index) => {
    const container = listRef.current;
    const item = container.children[index];
    if (item) {
      const containerHeight = container.offsetHeight;
      const itemOffsetTop = item.offsetTop;
      const itemHeight = item.offsetHeight;
      const scrollPosition = itemOffsetTop - containerHeight / 2 + itemHeight / 2;

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });

      setCurrentIndex(index);
    }
  };

  const handleHover = (index) => {
    scrollToIndex(index);
  };

  const handleNext = () => {
    updateMetric('goal', goals[currentIndex]);
    navigate('/weight');
  };

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div className="goal-container">
      <h2>WHAT'S YOUR GOAL?</h2>
      <p className="subtitle">THIS HELPS US CREATE YOUR PERSONALIZED PLAN</p>

      <div className="scroll-list" ref={listRef} onScroll={handleScroll}>
        {goals.map((goal, index) => (
          <div
            key={index}
            className={`goal-item ${index === currentIndex ? 'active' : 'dimmed'}`}
            onMouseEnter={() => handleHover(index)}
          >
            {goal}
          </div>
        ))}
      </div>

      <div className="goal-actions">
        <button className="back-btn" onClick={() => navigate(-1)}>{'←'}</button>
        <button className="next-btn" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default Goal;
