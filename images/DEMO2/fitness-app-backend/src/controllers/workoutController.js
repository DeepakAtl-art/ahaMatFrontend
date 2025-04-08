import * as workoutModel from '../models/Workout.js';

export const getTodaysWorkout = async (req, res) => {
  try {
    const workouts = await workoutModel.getWorkoutForToday();
    console.log(workouts);
    
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch today's workout" });
  }
};

export const getWorkoutByCategory = async (req, res) => {
  const { level } = req.params;
  try {
    const workouts = await workoutModel.getWorkoutByLevel(level);
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts by level' });
  }
};

export const createWorkout = async (req, res) => {
    const { title, description, level, media_url, workout_date } = req.body;
  
    try {
      await workoutModel.createWorkout({
        title,
        description,
        level,
        media_url,
        workout_date,
      });
  
      res.status(201).json({ message: 'Workout created successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create workout', message: err.message });
    }
  };