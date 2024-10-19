import express from 'express'
import { listUser } from '../controllers/user.js';
import { authenticateToken } from '../middleware/authMiddleWare.js'

const router = express.Router();

router.get('/users', authenticateToken, listUser)
router.post('/change-status')
router.post('/change-role')
router.post('/user/cart')
router.get('/user/cart')
router.delete('/user/cart')
router.post('/user/address')
router.post('/user/order')
router.get('/user/order')

export default router;