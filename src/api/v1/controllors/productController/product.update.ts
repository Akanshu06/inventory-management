import { Request, Response } from 'express';
import { ProductService } from '../../../../services/ProductService';
import { formatResponse } from '../../../../utils/helpers';

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductService.updateProduct(id, req.body);

    res.json(
      formatResponse(true, product, 'Product updated successfully')
    );
  } catch (error: any) {
    if (error.message === 'Product not found') {
      res.status(404).json(
        formatResponse(false, null, error.message)
      );
    } else {
      res.status(400).json(
        formatResponse(false, null, error.message)
      );
    }
  }
};