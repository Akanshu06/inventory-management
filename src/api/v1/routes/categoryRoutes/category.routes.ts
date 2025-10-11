import { Router } from 'express';
import { createCategory } from '../../controllors/categoryController/category.create';
import { getCategories, getCategoryById } from '../../controllors/categoryController/category.read';
import { updateCategory } from '../../controllors/categoryController/category.update';
import { deleteCategory } from '../../controllors/categoryController/category.delete';

const router = Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export { router as categoryRoutes };