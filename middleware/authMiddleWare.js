import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  // console.log(token);

  if (!token) {
    return res.sendStatus(401); // No token provided
  }

  try {
    const detailUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await prisma.user.findFirst({
      where: { email: detailUser.email },
    });
    // console.log(user);

    if (!user || !user.enabled) {
      return res
        .status(400)
        .json({ message: "This user cannot access or invalid" });
    }

    req.user = user; // การส่งต่อ ***********
    next();
  } catch (err) {
    return res.sendStatus(403); // Invalid token
  }
};

export const adminCheck = async (req, res, next) => {
  try {
    const adminUser = await prisma.user.findFirst({
      where: { email: req.user.email }, // Assuming req.user is set by authenticateToken
    });

    // console.log(adminUser);

    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "access denied Admin only" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
