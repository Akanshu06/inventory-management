import { Request, Response } from 'express';
import { Category } from '../../../../models/Category';
import { formatResponse } from '../../../../utils/helpers';

export const deleteCategory = async (req: Request, res: Response) => {
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

    await category.deleteOne();
    res.json(formatResponse(true, null, 'Category deleted successfully'));
  } catch (error: any) {
    res.status(500).json(formatResponse(false, null, error.message));
  }
};