import express from "express";
import { register, login, currentUser, currentAdmin, protectedToken } from "../controllers/auth.js";

const router = express.Router();

router.post(`/register`, register);
router.post(`/login`, login);
router.post(`/current-user`, currentUser);
router.post(`/current-admin`, currentAdmin);
router.get(`/protected`, protectedToken);

export default router;
