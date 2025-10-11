import { Request, Response } from 'express';
import { ProductService } from '../../../../services/ProductService';
import { formatResponse } from '../../../../utils/helpers';

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ProductService.deleteProduct(id);

    res.json(
      formatResponse(true, null, 'Product deleted successfully')
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