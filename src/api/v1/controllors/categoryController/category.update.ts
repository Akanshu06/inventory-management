import { Request, Response } from 'express';
import { Category } from '../../../../models/Category';
import { formatResponse } from '../../../../utils/helpers';

export const updateCategory = async (req: Request, res: Response) => {
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
};