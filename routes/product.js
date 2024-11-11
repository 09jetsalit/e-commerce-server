import express from 'express'
import { productCreate,productList,productUpdate,productDelete,productBy,productfilter,productRead, createImages, removeImage } from '../controllers/product.js'
import { authenticateToken, adminCheck} from '../middleware/authMiddleWare.js'


const router = express.Router();

router.post('/product', productCreate)
router.get('/products/:count', productList)
router.get('/product/:id', productRead)
router.put('/products/:id', productUpdate)
router.delete('/product/:id', productDelete)
router.post('/productby', productBy)
router.post('/search/filters', productfilter)

router.post('/images', authenticateToken, adminCheck, createImages)
router.post('/removeimages', authenticateToken, adminCheck, removeImage)

export default router;