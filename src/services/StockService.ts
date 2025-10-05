import { IStock, Stock } from '../models/Stock';

export class StockService {
  static async updateStock(
    productId: string,
    locationId: string,
    quantity: number,
    operation: 'add' | 'subtract'
  ): Promise<IStock> {
    try {
      let stock = await Stock.findOne({ product: productId, location: locationId });

      if (!stock) {
        stock = new Stock({
          product: productId,
          location: locationId,
          quantity: 0
        });
      }

      stock.quantity = operation === 'add'
        ? stock.quantity + quantity
        : stock.quantity - quantity;

      if (stock.quantity < 0) {
        throw new Error('Cannot reduce stock below 0');
      }

      await stock.save();
      return stock;
    } catch (error) {
      throw error;
    }
  }

  static async getStockByProduct(productId: string): Promise<IStock[]> {
    return await Stock.find({ product: productId }).populate('location');
  }

  static async getStockByLocation(locationId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const totalCount = await Stock.countDocuments({ location: locationId });
    const stocks = await Stock.find({ location: locationId })
      .populate('product')
      .skip(skip)
      .limit(limit);

    return {
      stocks,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    };
  }

  static async getLowStock(threshold?: number): Promise<IStock[]> {
    const filter = threshold ? { quantity: { $lte: threshold } } : { quantity: { $lte: 10 } };
    return await Stock.find(filter).populate('product').populate('location');
  }

  static async exportStock(): Promise<IStock[]> {
    return await Stock.find().populate('product').populate('location');
  }

  static async reserveStock(productId: string, locationId: string, quantity: number): Promise<IStock> {
    const stock = await Stock.findOne({ product: productId, location: locationId });
    if (!stock || stock.quantity < quantity) {
      throw new Error('Insufficient stock');
    }
    stock.reserved = (stock.reserved || 0) + quantity;
    await stock.save();
    return stock;
  }

  static async releaseReservedStock(productId: string, locationId: string, quantity: number): Promise<IStock> {
    const stock = await Stock.findOne({ product: productId, location: locationId });
    if (!stock) {
      throw new Error('Stock not found');
    }
    stock.reserved = Math.max(0, (stock.reserved || 0) - quantity);
    await stock.save();
    return stock;
  }
}