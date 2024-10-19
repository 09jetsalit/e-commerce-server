import { prisma } from "../config/prisma.js";


export const listUser = async (req, res) => {
    try {
        res.send("Hello userList")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error"})        
    }
}