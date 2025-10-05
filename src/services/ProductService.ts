import { IProduct, Product } from '../models/Product';
import { Category } from '../models/Category';
import { generateSKU } from '../utils/helpers';

export class ProductService {
  static async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    // Generate SKU if not provided
    if (!productData.sku) {
      let categoryName = 'GEN';
      if (productData.category) {
        const category = await Category.findById(productData.category);
        if (category) {
          categoryName = category.name;
        }
      }
      productData.sku = generateSKU(productData.name || 'PRODUCT', categoryName);
    }

    const product = new Product(productData);
    await product.save();
    return product;
  }

  static async getProducts(
    page: number = 1,
    limit: number = 20,
    search?: string,
    category?: string,
    includeStock?: boolean
  ) {
    const skip = (page - 1) * limit;
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      filter.category = category;
    }

    const totalCount = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate('category')
      .skip(skip)
      .limit(limit);

    return {
      products,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    };
  }

  static async getProductById(id: string, includeStock?: boolean): Promise<IProduct | null> {
    return await Product.findById(id).populate('category');
  }

  static async exportProducts(): Promise<IProduct[]> {
    return await Product.find().populate('category');
  }

  static async updateProduct(id: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    return product;
  }

  static async deleteProduct(id: string): Promise<IProduct | null> {
    const product = await Product.findByIdAndDelete(id);
    return product;
  }
}