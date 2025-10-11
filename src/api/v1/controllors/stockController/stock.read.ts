import { Request, Response } from 'express';
import { StockService } from '../../../../services/StockService';
import { formatResponse } from '../../../../utils/helpers';

export const getStockByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    
    const stock = await StockService.getStockByProduct(productId);

    res.json(
      formatResponse(true, stock, 'Stock retrieved successfully')
    );
  } catch (error: any) {
    if (error.message === 'Product not found') {
      res.status(404).json(
        formatResponse(false, null, error.message)
      );
    } else {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }
};

export const getStockByLocation = async (req: Request, res: Response) => {
  try {
    const { locationId } = req.params;
    const { page, limit } = req.query;
    
    const result = await StockService.getStockByLocation(
      locationId,
      parseInt(page as string) || 1,
      parseInt(limit as string) || 20
    );

    res.json(
      formatResponse(true, result, 'Stock retrieved successfully')
    );
  } catch (error: any) {
    res.status(500).json(
      formatResponse(false, null, error.message)
    );
  }
};

export const exportStock = async (req: Request, res: Response) => {
  try {
    const stock = await StockService.exportStock();

    res.json(
      formatResponse(true, stock, 'Stock exported successfully')
    );
  } catch (error: any) {
    res.status(500).json(
      formatResponse(false, null, error.message)
    );
  }
};