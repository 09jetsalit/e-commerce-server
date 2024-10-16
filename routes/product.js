import express from 'express'
import { productPost,productGet,productDelete,productBy,productfilter } from '../controllers/product.js'

const router = express.Router();

router.post('/product', productPost)
router.get('/product/:id', productGet)
router.delete('/product/:id', productDelete)
router.post('/productby', productBy)
router.post('/search/filters', productfilter)

export default router;