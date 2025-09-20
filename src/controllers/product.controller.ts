import type { Request, Response } from 'express';
import prisma from '../lib/db.js';

// const prisma = new PrismaClient();

// --- 1. HÀM LẤY TẤT CẢ SẢN PHẨM ---
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// --- 2. HÀM LẤY SẢN PHẨM THEO SLUG ---
export const getProductBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params; // Lấy slug từ URL, ví dụ: /api/products/margherita-pizza

    try {
        const product = await prisma.product.findUnique({
            where: { slug },
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(`Error fetching product with slug ${slug}:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
};