import express from 'express'
const router = express.Router()


//@Endpoint http://localhost:3000/api/category
router.get('/category' , (req, res) => {
    res.send('Hello Category')
})








export default router;