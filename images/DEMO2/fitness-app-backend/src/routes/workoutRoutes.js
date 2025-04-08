import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createWorkout, getTodaysWorkout, getWorkoutByCategory } from "../controllers/workoutController.js";

const router = express.Router();

/**
 * @swagger
 * /workouts/today:
 *   get:
 *     summary: Get today's workout
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns today's workout
 */
router.get("/today", authMiddleware, getTodaysWorkout);

/**
 * @swagger
 * /workouts/category/{level}:
 *   get:
 *     summary: Get workouts by category level
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout category level (e.g., beginner, advanced)
 *     responses:
 *       200:
 *         description: Workouts for the specified category
 */
router.get("/category/:level", authMiddleware, getWorkoutByCategory);

/**
 * @swagger
 * /workouts/create:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - level
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Evening Stretch"
 *               description:
 *                 type: string
 *                 example: "A light stretching workout"
 *               level:
 *                 type: string
 *                 example: "beginner"
 *               media_url:
 *                 type: string
 *                 example: "https://example.com/stretch.jpg"
 *               workout_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-06"
 *     responses:
 *       201:
 *         description: Workout created successfully
 *       500:
 *         description: Failed to create workout
 */
router.post('/create', authMiddleware, createWorkout);

export default router;
