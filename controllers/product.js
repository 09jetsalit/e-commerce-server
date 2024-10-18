import { prisma } from "../config/prisma.js";



export const productCreate = async (req, res) => {
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
        res.json(product)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const productList = async (req, res) => {
    try {
        const { count } = req.params;
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: {createdAt: "desc"},
            include:{
                category:true,
                images: true
            }
        })
        res.send(products)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const productRead = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include:{
                category:true,
                images: true
            }
        })
        res.send(products)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const productUpdate = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body;

        //clear picture
        await prisma.image.deleteMany({
            where:{
                productId: Number(req.params.id)
            }
        })
        
        const product = await prisma.product.update({
            where:{
                id: parseInt(req.params.id)
            },
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
        res.json(product)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const productDelete = async (req, res) => {
    try {
        const { id } = req.params


        //รอลบบนคลาวด์

        await prisma.product.delete({
            where:{
                id: parseInt(id)
            }
        })
        res.send("delete Success")
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const productBy = async (req, res) => {
    try {
        const { sort, order, limit} = req.body;
        const products = await prisma.product.findMany({
            take: limit,
            orderBy: {
                [sort]: order
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}


const handleQuery = async (req, res, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query,
                }
            },
            include: {
                category: true,
                images: true,
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err);
        res.status(500).send("search error")
    }
}
const handleCategory = async (req, res, categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map( (id) => Number(id))
                }
            },
            include: {
                category: true,
                images: true,
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err);
        res.status(500).send("search error")
    }
}
const handdlePrice = async (req, res, priceRange) => {
    try {
        const product = await prisma.product.findMany({
            where: {
                price: {
                    gt: priceRange[0],
                    lte: priceRange[1]
                }
            },
            include: {
                category: true,
                images: true,
            }
        })
        res.send(product)
    } catch (err) {
        console.log(err);
        res.status(500).send("search error")
    }
}


export const productfilter = async (req, res) => {
    try {
        const { query, category, price } = req.body;

        if (query) {
            // console.log(query);
            await handleQuery(req, res, query)
        }
        if (category) {
            // console.log(category);
            await handleCategory(req, res, category)
        }
        if (price) {
            // console.log(price);
            await handdlePrice(req, res, price)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
