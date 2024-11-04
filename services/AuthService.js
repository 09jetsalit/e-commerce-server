import User from "../models/AuthModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";

class UserService {
  async register(email, password) {
    if (!email || !password) {
      throw new Error("email and password is required");

      // return json({ message: `email or password is required`})
    }
    // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    // เข้ารหัสรหัสผ่าน
    const salt = Number(8);
    const hashPassword = await bcrypt.hash(password, salt);

    // object new user
    const newUser = new User(email);
    // console.log(newUser);

    // บันทึกผู้ใช้ใหม่
    await prisma.user.create({
      data: { email, password: hashPassword },
    });
    // console.log(createuser);

    return { user: newUser, message: "Register success" };
  }

  async login(email, password) {
    
    const userEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!userEmail) {
      throw new Error("Email or Password invalid");
    }

    // console.log(userEmail.password);
    
    const matchPassword = await bcrypt.compare(password, userEmail.password);
    if (!matchPassword) {
      throw new Error("Email or Password invalid");
    }
    const payload = {
      id: userEmail.id,
      email: userEmail.email,
      role: userEmail.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
    // console.log(payload, token);

    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
      expiresIn: "7d",
    });
    await prisma.user.update({
      where: {
        id: userEmail.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
    return { token, refreshToken, payload };
  }

  async refreshToken(refreshToken) {
    // ค้นหา refreshToken จากฐานข้อมูล
    const refreshTokenDB = await prisma.user.findFirst({
      where: {
        refreshToken: refreshToken
        },
    });

    // ตรวจสอบว่ามี refreshToken ในฐานข้อมูลหรือไม่
    if (!refreshTokenDB) {
      throw new Error("Token ไม่ถูกต้องหรือไม่มีในระบบ");
    }

    try {
      // ตรวจสอบความถูกต้องและการหมดอายุของ refreshToken
      const payload = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);

      // สร้าง access token ใหม่จาก payload
      const newAccessToken = jwt.sign(
        { id: payload.id, email: payload.email, role: payload.role },
        process.env.SECRET_KEY,
        { expiresIn: "3h" }
      );

    //   console.log(newAccessToken);

      return { token: newAccessToken };

    } catch (err) {
      throw new Error("Refresh Token หมดอายุหรือไม่ถูกต้อง");
    }
  }
}

export default new UserService();
