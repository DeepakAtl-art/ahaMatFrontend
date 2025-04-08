import { pool } from "../config/db.js";

export const getWorkoutForToday = async () => {
  const result = await pool.query(`
    SELECT * FROM workouts 
    WHERE DATE(created_at) = CURRENT_DATE 
    ORDER BY created_at DESC
  `);
  return result.rows;
};

export const getWorkoutByLevel = async (level) => {
  const result = await pool.query(
    `SELECT * FROM workouts WHERE LOWER(level) = LOWER($1) ORDER BY created_at DESC`,
    [level]
  );
  return result.rows;
};

export const createWorkout = async ({ title, description, level, media_url, workout_date }) => {
    const result = await pool.query(
      `INSERT INTO workouts (title, description, level, media_url, workout_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, level, media_url, workout_date]
    );
    return result.rows[0];
  };