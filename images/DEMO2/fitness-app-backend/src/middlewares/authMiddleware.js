import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Access Denied" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied: No Token" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("Decoded JWT:", req.user); // <-- log here
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(400).json({ message: "Invalid Token" });
  }
};
