import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import workoutRoutes from "./src/routes/workoutRoutes.js";
import swaggerDocs from "./src/config/swagger.js";
import { initializeDatabase } from "./src/config/initiatedb.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

await initializeDatabase();
// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/workouts", workoutRoutes);

//swagger-api-doc
swaggerDocs(app);

//database
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Database connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
