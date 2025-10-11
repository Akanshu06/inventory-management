import { Request, Response } from 'express';
import { StockService } from '../../../../services/StockService';
import { formatResponse } from '../../../../utils/helpers';

export const updateStock = async (req: Request, res: Response) => {
  try {
    const { productId, locationId, quantity, type } = req.body;
    
    // Map type to operation
    const operation = type === 'IN' ? 'add' : 'subtract';
    
    const stock = await StockService.updateStock(
      productId,
      locationId,
      quantity,
      operation
    );

    res.json(
      formatResponse(true, stock, 'Stock updated successfully')
    );
  } catch (error: any) {
    res.status(400).json(
      formatResponse(false, null, error.message)
    );
  }
};