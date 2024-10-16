import { prisma } from '../config/prisma.js'

export const categoryPost = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: {
                name: name,
            }
        })
        res.send(category);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const categoryGet = async (req, res) => {
    try {
        const category = await prisma.category.findMany();
        res.send(category);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const categoryDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })
        res.send(`delete ${category} success`);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}