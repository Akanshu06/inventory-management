import { Request, Response } from 'express';
import { StockService } from '../../../../services/StockService';
import { formatResponse } from '../../../../utils/helpers';

export const getLowStock = async (req: Request, res: Response) => {
  try {
    const { threshold } = req.query;
    
    const lowStock = await StockService.getLowStock(
      threshold ? parseInt(threshold as string) : undefined
    );

    res.json(
      formatResponse(true, lowStock, 'Low stock products retrieved successfully')
    );
  } catch (error: any) {
    res.status(500).json(
      formatResponse(false, null, error.message)
    );
  }
};