import bcrypt from "bcryptjs";
import {pool} from '../config/db.js';
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/User.js";
import { generateToken } from "../utils/jwtUtils.js";
import { sendVerificationEmail } from '../utils/mailer.js';

export const signup = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser(email, hashedPassword); 
  
      const userId = newUser.rows[0].id;
  
      const verificationToken = generateToken(userId);
      await sendVerificationEmail(email, verificationToken);
  
      res.status(201).json({
        message: "Signed up successfully. Please check your email to verify your account.",
        user: newUser.rows[0],
      });
    } catch (error) {
      res.status(500).json({ message: "Error signing up", error: error.message });
    }
  };
  
  export const verifyEmail = async (req, res) => {
    const { token } = req.query;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      await pool.query('UPDATE users SET is_verified = true WHERE id = $1', [userId]);
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Invalid or expired token' , error : err.message});
    }
  };
  

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user.id);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};


// export const sendVerificationEmail = async (email, token) => {
//   const verificationLink = `http://localhost:5000/api/auth/verify?token=${token}`;

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,      // your email
//       pass: process.env.EMAIL_PASSWORD,  // your password or app password
//     },
//   });

//   await transporter.sendMail({
//     from: `"Fitness App" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Email Verification',
//     html: `<h3>Click the link to verify your email:</h3><a href="${verificationLink}">${verificationLink}</a>`,
//   });
// };
