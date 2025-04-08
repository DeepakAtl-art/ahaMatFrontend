import { pool } from "../config/db.js";

export const createUser = async (email, password) => {
  return await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
    [email, password]
  );
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

export const getUserById = async (userId) => {
    const result = await pool.query(
      `SELECT 
         u.id, u.email, 
         m.gender, m.height, m.weight, m.age, m.goal, m.activity_level
       FROM users u
       LEFT JOIN user_metrics m ON u.id = m.user_id
       WHERE u.id = $1
       ORDER BY m.created_at DESC
       LIMIT 1`,
      [userId]
    );
    return result.rows[0];
  };
  

export const saveUserMetrics = async (userId, metrics) => {
    const { gender, height, weight, age, goal, activityLevel } = metrics;
  
    return await pool.query(
      `INSERT INTO user_metrics 
        (user_id, gender, height, weight, age, goal, activity_level) 
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, gender, height, weight, age, goal, activityLevel]
    );
  };