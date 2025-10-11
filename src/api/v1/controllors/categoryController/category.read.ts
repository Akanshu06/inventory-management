import { Request, Response } from 'express';
import { Category } from '../../../../models/Category';
import { formatResponse } from '../../../../utils/helpers';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()
      .populate('parent', 'name')
      .sort({ name: 1 });
    res.json(formatResponse(true, categories, 'Categories retrieved successfully'));
  } catch (error: any) {
    res.status(500).json(formatResponse(false, null, error.message));
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
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
};