import express from "express";
import { authenticateToken, adminCheck } from "../middleware/authMiddleWare.js";
import { changeOrderStatus, getOrderAdmin } from "../controllers/admin.js";

const router = express.Router();

router.put(`/admin/orders-status`, authenticateToken, adminCheck, changeOrderStatus);
router.get(`/admin/orders`, authenticateToken, adminCheck, getOrderAdmin);


export default router;
