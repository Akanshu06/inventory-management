import { ERROR_MESSAGES } from '../config/constants';
import { Category } from '../models/Category';
import { IProduct, Product } from '../models/Product';
import { Stock } from '../models/Stock';
import { calculatePagination, generateSKU } from '../utils/helpers';

export class ProductService {
  static async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    // Generate SKU if not provided
    if (!productData.sku) {
      const category = await Category.findById(productData.category);
      if (!category) {
        throw new Error(ERROR_MESSAGES.CATEGORY.NOT_FOUND);
      }
      productData.sku = generateSKU(productData.name!, category.name);
    }

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: productData.sku });
    if (existingProduct) {
      throw new Error(ERROR_MESSAGES.PRODUCT.SKU_EXISTS);
    }

    const product = new Product(productData);
    return await product.save();
  }

  static async getProducts(
    page: number = 1,
    limit: number = 20,
    search?: string,
    category?: string,
    includeStock: boolean = false
  ) {
    const { skip } = calculatePagination(page, limit);
    
    const filter: any = { isActive: true };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .populate('category', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    let productsWithStock: any[] = products;
    
    if (includeStock) {
      productsWithStock = await Promise.all(
        products.map(async (product) => {
          const stock = await Stock.find({ product: product._id })
            .populate('location', 'name');
          
          const totalStock = stock.reduce((sum, s) => sum + s.quantity, 0);
          const availableStock = stock.reduce((sum, s) => sum + (s.quantity - s.reserved), 0);

          return {
            ...product.toObject(),
            stock: {
              total: totalStock,
              available: availableStock,
              locations: stock
            }
          };
        })
      );
    }

    return {
      products: productsWithStock,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  static async getProductById(id: string, includeStock: boolean = false): Promise<any> {
    const product = await Product.findById(id)
      .populate('category', 'name description')
      .populate('variants');

    if (!product) {
      throw new Error(ERROR_MESSAGES.PRODUCT.NOT_FOUND);
    }

    if (!includeStock) {
      return product;
    }

    const stock = await Stock.find({ product: id })
      .populate('location', 'name city');

    const totalStock = stock.reduce((sum, s) => sum + s.quantity, 0);
    const availableStock = stock.reduce((sum, s) => sum + (s.quantity - s.reserved), 0);

    return {
      ...product.toObject(),
      stock: {
        total: totalStock,
        available: availableStock,
        locations: stock
      }
    };
  }

  static async updateProduct(id: string, updateData: Partial<IProduct>): Promise<IProduct> {
    if (updateData.sku) {
      const existingProduct = await Product.findOne({
        sku: updateData.sku,
        _id: { $ne: id }
      });
      
      if (existingProduct) {
        throw new Error(ERROR_MESSAGES.PRODUCT.SKU_EXISTS);
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!product) {
      throw new Error(ERROR_MESSAGES.PRODUCT.NOT_FOUND);
    }

    return product;
  }

  static async deleteProduct(id: string): Promise<void> {
    const product = await Product.findById(id);
    
    if (!product) {
      throw new Error(ERROR_MESSAGES.PRODUCT.NOT_FOUND);
    }

    // Check if product has stock
    const stockCount = await Stock.countDocuments({ product: id, quantity: { $gt: 0 } });
    
    if (stockCount > 0) {
      throw new Error('Cannot delete product with existing stock');
    }

    // Soft delete
    await Product.findByIdAndUpdate(id, { isActive: false });
  }

  static async exportProducts(): Promise<IProduct[]> {
    return await Product.find({ isActive: true })
      .populate('category', 'name')
      .select('-__v')
      .sort({ sku: 1 });
  }
}