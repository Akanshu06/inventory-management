import { Request, Response } from 'express';
import { Category } from '../../../models/Category';
import { formatResponse } from '../../../utils/helpers';

export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(formatResponse(true, category, 'Category created successfully'));
    } catch (error: any) {
      res.status(400).json(formatResponse(false, null, error.message));
    }
  }

  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await Category.find()
        .populate('parent', 'name')
        .sort({ name: 1 });
      res.json(formatResponse(true, categories, 'Categories retrieved successfully'));
    } catch (error: any) {
      res.status(500).json(formatResponse(false, null, error.message));
    }
  }


  static async getCategoryById(req: Request, res: Response) {
    try {
      const category = await Category.findById(req.params.id)
        .populate('parent', 'name');
      
      if (!category) {
        return res.status(404).json(formatResponse(false, null, 'Category not found'));
      }

      res.json(formatResponse(true, category, 'Category retrieved successfully'));
    } catch (error: any) {
      res.status(500).json(formatResponse(false, null, error.message));
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      ).populate('parent', 'name');

      if (!category) {
        return res.status(404).json(formatResponse(false, null, 'Category not found'));
      }

      res.json(formatResponse(true, category, 'Category updated successfully'));
    } catch (error: any) {
      res.status(400).json(formatResponse(false, null, error.message));
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const category = await Category.findById(req.params.id);
      
      if (!category) {
        return res.status(404).json(formatResponse(false, null, 'Category not found'));
      }

      // Check if category has child categories
      const childCategories = await Category.findOne({ parent: category._id });
      if (childCategories) {
        return res.status(400).json(
          formatResponse(false, null, 'Cannot delete category with child categories')
        );
      }

      // Check if category has products (assuming Product model has category field)
      const products = await Category.findOne({ category: category._id });
      if (products) {
        return res.status(400).json(
          formatResponse(false, null, 'Cannot delete category with associated products')
        );
      }

      await category.deleteOne();
      res.json(formatResponse(true, null, 'Category deleted successfully'));
    } catch (error: any) {
      res.status(500).json(formatResponse(false, null, error.message));
    }
  }
}