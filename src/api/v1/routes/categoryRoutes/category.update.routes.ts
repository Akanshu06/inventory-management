import { Router } from 'express';
import { updateCategory } from '../../controllors/categoryController/category.update';

const router = Router();

router.put('/:id', updateCategory);

export { router as categoryUpdateRoutes };