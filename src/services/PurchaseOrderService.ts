import { IPurchaseOrder, PurchaseOrder, PurchaseOrderStatus } from '../models/PurchaseOrder';
// import { generatePONumber } from '../utils/helpers';
import { StockService } from './StockService';

export class PurchaseOrderService {
  static async createPurchaseOrder(poData: Partial<IPurchaseOrder>): Promise<IPurchaseOrder> {
    // Generate PO number if not provided
    if (!poData.poNumber) {
      poData.poNumber = 'PO-' + Date.now();
    }

    // Calculate total amount
    if (poData.items && poData.items.length > 0) {
      poData.totalAmount = poData.items.reduce((total, item) => {
        return total + (item.quantity * item.unitCost);
      }, 0);
    }

    const purchaseOrder = new PurchaseOrder(poData);
    await purchaseOrder.save();
    return purchaseOrder;
  }

  static async getPurchaseOrders(
    page: number = 1,
    limit: number = 20,
    status?: PurchaseOrderStatus
  ) {
    const skip = (page - 1) * limit;
    const filter = status ? { status } : {};
    const totalCount = await PurchaseOrder.countDocuments(filter);
    const purchaseOrders = await PurchaseOrder.find(filter)
      .populate('items.product')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      purchaseOrders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit
      }
    };
  }

  static async getPurchaseOrderById(id: string): Promise<IPurchaseOrder | null> {
    return await PurchaseOrder.findById(id).populate('items.product');
  }

  static async updatePurchaseOrderStatus(
    id: string,
    status: PurchaseOrderStatus,
    locationId?: string
  ): Promise<IPurchaseOrder> {
    const po = await PurchaseOrder.findById(id);
    if (!po) {
      throw new Error('Purchase order not found');
    }

    po.status = status;
    await po.save();
    return po;
  }

  static async addItemToPurchaseOrder(
    id: string,
    item: { product: string; quantity: number; unitCost: number }
  ): Promise<IPurchaseOrder> {
    const po = await PurchaseOrder.findById(id);
    if (!po) {
      throw new Error('Purchase order not found');
    }

    po.items.push(item as any);
    await po.save();
    return po;
  }

  static async exportPurchaseOrders(): Promise<IPurchaseOrder[]> {
    return await PurchaseOrder.find().populate('items.product');
  }
}