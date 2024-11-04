import express from "express";
import { register, login, currentUser, currentAdmin, token } from "../controllers/authController.js";
import {authenticateToken, adminCheck} from '../middleware/authMiddleWare.js'
const router = express.Router();


router.post(`/register`, register);
router.post(`/login`, login);
router.post(`/current-user`, authenticateToken, currentUser);
router.post(`/current-admin`, authenticateToken, adminCheck, currentAdmin);
router.post(`/token`, token);

export default router;
