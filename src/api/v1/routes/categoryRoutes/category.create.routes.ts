import { Router } from 'express';
import { createCategory } from '../../controllors/categoryController/category.create';

const router = Router();

router.post('/', createCategory);

export { router as categoryCreateRoutes };