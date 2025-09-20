import type { Request, Response } from 'express';
import prisma from '../lib/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// const prisma = new PrismaClient();

// --- 1. HÀM ĐĂNG KÝ ---
export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." });
        }

        // Băm mật khẩu
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Tạo user mới trong database
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                // Role mặc định là CLIENT đã được định nghĩa trong schema
            },
        });

        // Không trả về mật khẩu
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({ message: "User created successfully", user: userWithoutPassword });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// --- 2. HÀM ĐĂNG NHẬP ---
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Tìm user trong database
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials." });
        }

        // So sánh mật khẩu
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role }, // Payload chứa thông tin cần thiết
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' } // Token hết hạn sau 1 ngày
        );

        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({ 
            message: "Login successful", 
            user: userWithoutPassword,
            accessToken: token 
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};