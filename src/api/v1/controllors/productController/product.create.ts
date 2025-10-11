import { Request, Response } from 'express';
import { ProductService } from '../../../../services/ProductService';
import { formatResponse } from '../../../../utils/helpers';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.createProduct(req.body);
    
    res.status(201).json(
      formatResponse(true, product, 'Product created successfully')
    );
  } catch (error: any) {
    res.status(400).json(
      formatResponse(false, null, error.message)
    );
  }
};