import express from 'express'
const categoryRouter = express.Router()


//@Endpoint http://localhost:3000/api/category
categoryRouter.get('/category' , (req, res) => {
    res.send('Hello Category')
})








export default categoryRouter;