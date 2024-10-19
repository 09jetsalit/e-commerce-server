import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma.js';

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log(req.headers.authorization);
    
    if (!token) {
      return res.sendStatus(401)};    
    
    jwt.verify(token, process.env.SECRET_KEY,async (err, detailUser) => {

      if (err) {return res.sendStatus(403)};       
      const user = await prisma.user.findFirst({
        where: {
          email: detailUser.email
        }
      })
      // console.log(user);
      
      if(!user.enbled) {
        return res.status(400).json({ message: "This account canot access"})
      }
      next();
    });
  }
  