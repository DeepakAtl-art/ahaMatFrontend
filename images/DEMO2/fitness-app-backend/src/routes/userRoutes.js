import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getProfile, saveMetrics } from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user profile data
 */
router.get("/profile", authMiddleware, getProfile);

/**
 * @swagger
 * /user/metrics:
 *   post:
 *     summary: Save user metrics
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gender:
 *                 type: string
 *               age:
 *                 type: number
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *               goal:
 *                 type: string
 *               activityLevel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Metrics saved successfully
 */
router.post("/metrics", authMiddleware,saveMetrics);

export default router;
