import User from '../models/AuthModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma.js'

class UserService {
    async register (email, password) {
        if(!email || !password){
            throw new Error("email and password is required");
            
            // return json({ message: `email or password is required`})
        }
        // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
        const existingUser = await prisma.user.findFirst({
            where: { email }
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
            data: { email, password: hashPassword }
        });
        // console.log(createuser);
        

        return { user: newUser, message: "Register success" };
    }

    async login (email, password) {
        const userEmail = await prisma.user.findFirst({
            where:{
                email: email
            }            
        })
        if (!userEmail) {
            throw new Error("Email or Password invalid");
            
        }
        
        const matchPassword = bcrypt.compare(password, userEmail.password)
        if (!matchPassword) {
            throw new Error("Email or Password invalid");
        }
        const payload = {
            id: userEmail.id,
            email: userEmail.email,
            role: userEmail.role
        }

        const token = jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:'3h'})
            // console.log(payload, token);
            return { token, payload }
        }
}

export default new UserService();