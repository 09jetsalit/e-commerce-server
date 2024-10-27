import { prisma } from '../config/prisma.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserService from '../services/AuthService.js';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const message = await UserService.register(email, password);
        res.status(201).json({ message });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, payload } = await UserService.login(email, password)
        res.status(200).json({ message: "Login successful",token: token, user: payload });
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

