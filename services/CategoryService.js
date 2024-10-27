import { prisma } from "../config/prisma.js";
import Category from "../models/CategoryModel.js";

class CategoryService {
    async createCategory (name) {
       const createCategory = await prisma.category.create({
            data: {
                name: name,
            }
        })
        const newCategory = new Category(name)
        return createCategory 
    }

    async getCategory () {
        const getCategory = await prisma.category.findMany()
        return getCategory
    }

    async deleteCategory (id) {
        const deleteCategory = await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })
        return deleteCategory;
    }
}

export default new CategoryService();