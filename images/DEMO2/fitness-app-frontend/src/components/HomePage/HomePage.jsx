import React, { useState, useEffect } from 'react';
import './HomePage.css';
import image from '../../assets/gym.jpg';
import { FaHome, FaChartBar, FaBell, FaUser } from "react-icons/fa";
import axios from 'axios';

function HomePage() {
  const [userName, setUserName] = useState('User');
  const [selectedCategory, setSelectedCategory] = useState("Beginner");
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [categoryWorkouts, setCategoryWorkouts] = useState([]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short', day: 'numeric', month: 'short'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;

        const userRes = await axios.get(`${baseURL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userName = userRes.data.email.split('@')[0];
        setUserName(userName || 'User');

        const todayWorkoutRes = await axios.get(`${baseURL}/api/workouts/today`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTodayWorkouts(todayWorkoutRes.data || []);

        const categoryWorkoutRes = await axios.get(`${baseURL}/api/workouts/category/${selectedCategory}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategoryWorkouts(categoryWorkoutRes.data || []);

      } catch (error) {
        console.error('Error loading home data:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          HELLO <span>{userName.toUpperCase()},</span>
        </h1>
        <p>Good morning.</p>
      </header>

      <section className="workout-plan">
        <h2>Today Workout Plan <span className="date">{currentDate}</span></h2>
        {todayWorkouts.length > 0 ? (
          todayWorkouts.map((workout, index) => (
            <div className="workout-card" key={index}>
              <img src={workout.image || image} alt={workout.title} />
              <div className="workout-info">
                <h3>{workout.title}</h3>
                <p>{workout.time}</p>
              </div>
            </div>
          ))
        ) : <p>Loading workout...</p>}
      </section>

      <section className="categories">
        <h2>Workout Categories <span className="see-all">See All</span></h2>
        <div className="category-tabs">
          {['Beginner', 'Intermediate', 'Advance'].map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {categoryWorkouts.length > 0 ? (
          categoryWorkouts.map((workout, index) => (
            <div className="workout-card" key={index}>
              <img src={workout.image || image} alt={workout.title} />
              <div className="workout-info">
                <h3>{workout.title}</h3>
                <p>{workout.description}</p>
              </div>
            </div>
          ))
        ) : <p>Loading category workouts...</p>}
      </section>

      <nav className="bottom-nav">
        <FaHome className='nav-active' />
        <FaChartBar />
        <FaBell />
        <FaUser />
      </nav>
    </div>
  );
}

export default HomePage;
