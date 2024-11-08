import express from 'express'
import { categoryDelete, categoryGet, categoryPost } from '../controllers/categoryController.js'
import { authenticateToken, adminCheck} from '../middleware/authMiddleWare.js'

const router = express.Router()


//@Endpoint http://localhost:3000/api/category
router.post('/category' , authenticateToken, adminCheck, categoryPost);
router.get('/category' , authenticateToken, adminCheck, categoryGet);
router.delete('/category/:id' , authenticateToken, adminCheck, categoryDelete);




export default router;