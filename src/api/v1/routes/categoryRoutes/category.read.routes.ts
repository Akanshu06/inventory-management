import { Router } from 'express';
import { getCategories, getCategoryById } from '../../controllors/categoryController/category.read';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);

export { router as categoryReadRoutes };