import { prisma } from "../config/prisma.js";

export const changeOrderStatus = async (req, res) => {
    try {
        const {orderId, orderStatus} = req.body;
        const orderUpdate = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                orderStatus: orderStatus
            }
        })

        res.json({orderUpdate})
        // res.send('Hello chage order')
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: ' Server Error'})
    }
}

export const getOrderAdmin = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            },
            orderdBy: {
                id: true,
                email: true,
                address: true
            }
        })
        // res.send('Hello getOrderAdmin')
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: ' Server Error'})
    }
}