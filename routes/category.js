import express from 'express'
import { categoryDelete, categoryGet, categoryPost } from '../controllers/category.js'

const router = express.Router()


//@Endpoint http://localhost:3000/api/category
router.post('/category' , categoryPost);
router.get('/category' , categoryGet);
router.delete('/category/:id' , categoryDelete);




export default router;