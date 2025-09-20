import { Router } from 'express';
import { getAllProducts, getProductBySlug } from '../controllers/product.controller.js';

const router = Router();

// Định nghĩa route cho GET /api/products
router.get('/', getAllProducts);

// Định nghĩa route cho GET /api/products/:slug
router.get('/:slug', getProductBySlug);

export default router;