import { Request, Response } from 'express';
import { PurchaseOrderStatus } from '../../../models/PurchaseOrder';
import { PurchaseOrderService } from '../../../services/PurchaseOrderService';
import { formatResponse } from '../../../utils/helpers';

export class PurchaseOrderController {
  static async createPurchaseOrder(req: Request, res: Response) {
    try {
      // console.log('i am here')
      const purchaseOrder = await PurchaseOrderService.createPurchaseOrder(req.body);
      
      res.status(201).json(
        formatResponse(true, purchaseOrder, 'Purchase order created successfully')
      );
    } catch (error: any) {
      res.status(400).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getPurchaseOrders(req: Request, res: Response) {
    try {
      const { page, limit, status } = req.query;
      
      const result = await PurchaseOrderService.getPurchaseOrders(
        parseInt(page as string) || 1,
        parseInt(limit as string) || 20,
        status ? status as PurchaseOrderStatus : undefined
      );

      res.json(
        formatResponse(true, result.purchaseOrders, 'Purchase orders retrieved successfully', {
          pagination: result.pagination
        })
      );
    } catch (error: any) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getPurchaseOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const purchaseOrder = await PurchaseOrderService.getPurchaseOrderById(id);

      res.json(
        formatResponse(true, purchaseOrder, 'Purchase order retrieved successfully')
      );
    } catch (error: any) {
      if (error.message === 'Purchase order not found') {
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

  static async updatePurchaseOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, locationId } = req.body;
      
      const purchaseOrder = await PurchaseOrderService.updatePurchaseOrderStatus(
        id,
        status,
        locationId
      );

      res.json(
        formatResponse(true, purchaseOrder, 'Purchase order status updated successfully')
      );
    } catch (error: any) {
      if (error.message === 'Purchase order not found') {
        res.status(404).json(
          formatResponse(false, null, error.message)
        );
      } else {
        res.status(400).json(
          formatResponse(false, null, error.message)
        );
      }
    }
  }

  static async addItemToPurchaseOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const purchaseOrder = await PurchaseOrderService.addItemToPurchaseOrder(id, req.body);

      res.json(
        formatResponse(true, purchaseOrder, 'Item added to purchase order successfully')
      );
    } catch (error: any) {
      if (error.message === 'Purchase order not found') {
        res.status(404).json(
          formatResponse(false, null, error.message)
        );
      } else {
        res.status(400).json(
          formatResponse(false, null, error.message)
        );
      }
    }
  }

  static async exportPurchaseOrders(req: Request, res: Response) {
    try {
      const purchaseOrders = await PurchaseOrderService.exportPurchaseOrders();

      res.json(
        formatResponse(true, purchaseOrders, 'Purchase orders exported successfully')
      );
    } catch (error: any) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }
}