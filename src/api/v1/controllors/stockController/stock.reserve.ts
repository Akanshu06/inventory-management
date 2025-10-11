import { Request, Response } from 'express';
import { StockService } from '../../../../services/StockService';
import { formatResponse } from '../../../../utils/helpers';

export const reserveStock = async (req: Request, res: Response) => {
  try {
    const { productId, locationId, quantity } = req.body;
    
    const stock = await StockService.reserveStock(
      productId,
      locationId,
      quantity
    );

    res.json(
      formatResponse(true, stock, 'Stock reserved successfully')
    );
  } catch (error: any) {
    res.status(400).json(
      formatResponse(false, null, error.message)
    );
  }
};

export const releaseReservedStock = async (req: Request, res: Response) => {
  try {
    const { productId, locationId, quantity } = req.body;
    
    const stock = await StockService.releaseReservedStock(
      productId,
      locationId,
      quantity
    );

    res.json(
      formatResponse(true, stock, 'Reserved stock released successfully')
    );
  } catch (error: any) {
    res.status(400).json(
      formatResponse(false, null, error.message)
    );
  }
};