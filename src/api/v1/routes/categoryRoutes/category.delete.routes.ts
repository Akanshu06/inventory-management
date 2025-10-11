import { Router } from 'express';
import { deleteCategory } from '../../controllors/categoryController/category.delete';

const router = Router();

router.delete('/:id', deleteCategory);

export { router as categoryDeleteRoutes };