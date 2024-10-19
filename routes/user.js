import express from "express";
import {
  listUser,
  changeStatus,
  changeRole,
  createCart,
  listCart,
  deleteCart,
  address,
  createOrder,
  getOrder
} from "../controllers/user.js";
import { authenticateToken, adminCheck } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.get("/users", authenticateToken, adminCheck, listUser);
router.post("/change-status", authenticateToken, adminCheck, changeStatus);
router.post("/change-role", authenticateToken, adminCheck, changeRole);
router.post("/user/cart", authenticateToken, createCart);
router.get("/user/cart", authenticateToken, listCart);
router.delete("/user/cart", authenticateToken, deleteCart);
router.post("/user/address", authenticateToken, address);
router.post("/user/order", authenticateToken, createOrder);
router.get("/user/order", authenticateToken, getOrder);

export default router;
