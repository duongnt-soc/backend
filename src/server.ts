import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './api/auth.routes.js'; 
import productRoutes from './api/product.routes.js';

// Kích hoạt các biến môi trường từ file .env
dotenv.config();

// Khởi tạo ứng dụng Express
const app = express();

// Lấy PORT từ biến môi trường, nếu không có thì mặc định là 8000
const PORT = process.env.PORT || 8000;

// --- MIDDLEWARE ---
// CORS (Cross-Origin Resource Sharing): Cho phép frontend (chạy ở port 3000)
// có thể gửi request đến backend (chạy ở port 8000)
app.use(cors());

// express.json(): Giúp server có thể đọc và hiểu được dữ liệu JSON
// mà client gửi lên trong body của request (ví dụ: khi đăng nhập, đăng ký)
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// --- ROUTES ---
// Route cơ bản để kiểm tra server có "sống" hay không (Health Check)
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', message: 'Server is running healthy' });
});

// --- KHỞI ĐỘNG SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});