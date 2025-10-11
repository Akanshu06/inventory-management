import { Request, Response } from 'express';
import { Category } from '../../../../models/Category';
import { formatResponse } from '../../../../utils/helpers';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(formatResponse(true, category, 'Category created successfully'));
  } catch (error: any) {
    res.status(400).json(formatResponse(false, null, error.message));
  }
};