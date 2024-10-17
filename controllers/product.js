import { prisma } from "../config/prisma.js";



export const productPost = async (req, res) => {
    try {
        
        const { title, description, price, quantity, categoryId, images } = req.body;

        const product = await prisma.product.create({
            data:{
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map(( item ) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url,
                    }))
                },
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const productGet = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const productDelete = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const productBy = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const productfilter = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
