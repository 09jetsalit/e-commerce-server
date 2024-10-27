import { prisma } from '../config/prisma.js'
import CategoryService from '../services/CategoryService.js';

export const categoryPost = async (req, res) => {
    try {
        const { name } = req.body;
        const createCategory = await CategoryService.createCategory(name);
        res.json({Category: createCategory,
            message: `Create Category Success`
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

export const categoryGet = async (req, res) => {
    try {
        const getCategory = await CategoryService.getCategory();
        res.json(getCategory);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const categoryDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryService.deleteCategory(id);
        res.json({
            DeleteCategory: category,
            message: `Delete CategoryID ${id} success`
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error or didn`t have category"});
    }
}