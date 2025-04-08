import * as userModel from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    
    const user = await userModel.getUserById(userId);
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile',message: err.message });
  }
};

export const saveMetrics = async (req, res) => {
  const { gender, height, weight, age, goal, activityLevel } = req.body;
  const userId = req.user.id;

  try {
    await userModel.saveUserMetrics(userId, {
      gender,
      height,
      weight,
      age,
      goal,
      activityLevel
    });
    res.status(200).json({ message: 'User metrics saved' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save metrics', error: err.message });
  }
};
