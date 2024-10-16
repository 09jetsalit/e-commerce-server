import { prisma } from '../config/prisma.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    try {
        const { email, password} = req.body;
        if(!email | !password){
            return res.status(400).json({ message: `email or password is required`})
        }
        
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if (user) {
            return res.status(400).json({message: `Email has already exit!@#$%^&`})
        }

        const hashPassword = await bcrypt.hash(password,8)
        

        //step 4 insert in database

        await prisma.user.create({
            data:{
                email: email,
                password: hashPassword
            }
        })
       
        res.send(`Register success`)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body; 
        
        const userEmail = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if (!userEmail) {
            return res.status(400).json({message: 'Email invalid'})
        }
        
        const matchPassword =await bcrypt.compare(password,userEmail.password)
        if (!matchPassword) {
            return res.status(400).json({message: 'Password Invalid'})
        }

        const payload = {
            id: userEmail.id,
            email: userEmail.email,
            role: userEmail.role
        }

        jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:'1d'},(err,token) => {
                if (err) {
                    return res.status(500).json({message: 'Server Error'})
                }
                res.json({payload, token})
            })

    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}

export const protectedToken = async (req, res) => {
    res.send('This is a protected route');
  }

export const currentUser = async (req, res) => {
    try {
        res.send(`Hello currentUser In Controller`)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}

export const currentAdmin = async (req, res) => {
    try {
        res.send(`Hello currentAdmin In Controller`)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}

