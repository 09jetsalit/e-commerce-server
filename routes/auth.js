import express from 'express'

const router = express.Router()

router.get(`/register` , (req, res) => {
    res.send(`hello register`)
})



export default router;