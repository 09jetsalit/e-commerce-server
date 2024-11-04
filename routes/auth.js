import express from "express";
import { register, login, currentUser, currentAdmin, token } from "../controllers/authController.js";

const router = express.Router();


router.post(`/register`, register);
router.post(`/login`, login);
router.post(`/current-user`, currentUser);
router.post(`/current-admin`, currentAdmin);
router.post(`/token`, token);

export default router;
