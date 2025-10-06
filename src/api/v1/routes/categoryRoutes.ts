import { Router } from 'express';
import { validate } from '../../../middlewares/validation';
import { CategoryController } from '../controllors/categoryController';
import {
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema
} from '../validators/categoryValidator';

const router = Router();

// Create a new category
router.post(
  '/',
  validate(createCategorySchema),
  CategoryController.createCategory
);

// Get all categories
router.get(
  '/',
  CategoryController.getCategories
);

// Get category by ID
router.get(
  '/:id',
  validate(categoryIdSchema),
  CategoryController.getCategoryById
);

// Update category
router.put(
  '/:id',
  validate(updateCategorySchema),
  CategoryController.updateCategory
);

// Delete category
router.delete(
  '/:id',
  validate(categoryIdSchema),
  CategoryController.deleteCategory
);

export { router as categoryRoutes };
