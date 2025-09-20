import { PrismaClient } from '@prisma/client';

// Khai báo một biến global để lưu trữ instance của Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Tạo một instance của PrismaClient.
// Nếu đang ở môi trường development, chúng ta gán nó vào biến global.
// Điều này ngăn việc tạo ra nhiều instance mới mỗi khi hot-reload,
// giúp tránh lỗi và tiết kiệm tài nguyên.
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;