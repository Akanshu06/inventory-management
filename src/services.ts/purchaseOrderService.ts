import { PurchaseOrder, IPurchaseOrder, PurchaseOrderStatus } from '../models/PurchaseOrder';
import { Product } from '../models/Product';
import { StockService } from './StockService';
import { ERROR_MESSAGES } from '../config/constants';
import { generatePONumber } from '../utils/helpers';

export class PurchaseOrderService {
  static async createPurchaseOrder(poData: Partial<IPurchaseOrder>): Promise<IPurchaseOrder> {
    // Generate PO number if not provided
    if (!poData.poNumber) {
      poData.poNumber = generatePONumber();
    }

    // Calculate total amount
    if (poData.items && poData.items.length > 0) {
      poData.totalAmount = poData.items.reduce((total, item) => {
        return total + (item.quantity * item.unitCost);
      }, 0);
    }

    const purchaseOrder = new PurchaseOrder(poData);
    return await purchaseOrder.save();
  }

  static async getPurchaseOrders(
    page: number = 1,
    limit: number = 20,
    status?: PurchaseOrderStatus
  ) {
    const skip = (page - 1) * limit;
    
    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    const purchaseOrders = await PurchaseOrder.find(filter)
      .populate('items.product', 'name sku')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await PurchaseOrder.countDocuments(filter);

    return {
      purchaseOrders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  static async getPurchaseOrderById(id: string): Promise<IPurchaseOrder> {
    const purchaseOrder = await PurchaseOrder.findById(id)
      .populate('items.product', 'name sku price images');

    if (!purchaseOrder) {
      throw new Error(ERROR_MESSAGES.PURCHASE_ORDER.NOT_FOUND);
    }

    return purchaseOrder;
  }

  static async updatePurchaseOrderStatus(
    id: string, 
    status: PurchaseOrderStatus,
    locationId?: string
  ): Promise<IPurchaseOrder> {
    const purchaseOrder = await PurchaseOrder.findById(id);
    
    if (!purchaseOrder) {
      throw new Error(ERROR_MESSAGES.PURCHASE_ORDER.NOT_FOUND);
    }

    // Validate status transition
    this.validateStatusTransition(purchaseOrder.status, status);

    purchaseOrder.status = status;

    // If status is received, update stock
    if (status === PurchaseOrderStatus.RECEIVED && locationId) {
      if (!purchaseOrder.items || purchaseOrder.items.length === 0) {
        throw new Error('Cannot receive purchase order with no items');
      }

      // Update stock for each item
      for (const item of purchaseOrder.items) {
        await StockService.updateStock(
          item.product.toString(),
          locationId,
          item.quantity,
          'add'
        );

        item.receivedQuantity = item.quantity;
      }

      purchaseOrder.receivedAt = new Date();
    }

    await purchaseOrder.save();
    return await this.getPurchaseOrderById(id);
  }

  static async addItemToPurchaseOrder(
    id: string,
    item: { product: string; quantity: number; unitCost: number }
  ): Promise<IPurchaseOrder> {
    const purchaseOrder = await PurchaseOrder.findById(id);
    
    if (!purchaseOrder) {
      throw new Error(ERROR_MESSAGES.PURCHASE_ORDER.NOT_FOUND);
    }

    // Check if product exists
    const product = await Product.findById(item.product);
    if (!product) {
      throw new Error(ERROR_MESSAGES.PRODUCT.NOT_FOUND);
    }

    // Add item to purchase order
    purchaseOrder.items.push(item as any);

    // Recalculate total amount
    purchaseOrder.totalAmount = purchaseOrder.items.reduce((total, item) => {
      return total + (item.quantity * item.unitCost);
    }, 0);

    await purchaseOrder.save();
    return await this.getPurchaseOrderById(id);
  }

  static async exportPurchaseOrders(): Promise<IPurchaseOrder[]> {
    return await PurchaseOrder.find()
      .populate('items.product', 'name sku')
      .select('-__v')
      .sort({ createdAt: -1 });
  }

  private static validateStatusTransition(currentStatus: PurchaseOrderStatus, newStatus: PurchaseOrderStatus): void {
    const validTransitions: Record<PurchaseOrderStatus, PurchaseOrderStatus[]> = {
      [PurchaseOrderStatus.DRAFT]: [PurchaseOrderStatus.SUBMITTED, PurchaseOrderStatus.CANCELLED],
      [PurchaseOrderStatus.SUBMITTED]: [PurchaseOrderStatus.APPROVED, PurchaseOrderStatus.CANCELLED],
      [PurchaseOrderStatus.APPROVED]: [PurchaseOrderStatus.RECEIVED, PurchaseOrderStatus.CANCELLED],
      [PurchaseOrderStatus.RECEIVED]: [],
      [PurchaseOrderStatus.CANCELLED]: []
    };

    if (!validTransitions[currentStatus].includes(newStatus)) {
      throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
    }
  }
}