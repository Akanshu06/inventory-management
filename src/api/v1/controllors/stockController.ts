import { Request, Response } from 'express';
import { StockService } from '../../../services/StockService';
import { formatResponse } from '../../../utils/helpers';

export class StockController {
  static async updateStock(req: Request, res: Response) {
    try {
      const { productId, locationId, quantity, operation } = req.body;
      
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
  }

  static async getStockByProduct(req: Request, res: Response) {
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
  }

  static async getStockByLocation(req: Request, res: Response) {
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
  }

  static async getLowStock(req: Request, res: Response) {
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
  }

  static async exportStock(req: Request, res: Response) {
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
  }

  static async reserveStock(req: Request, res: Response) {
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
  }

  static async releaseReservedStock(req: Request, res: Response) {
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
  }
}