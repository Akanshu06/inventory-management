import { Request, Response } from 'express';
import { ProductService } from '../../../services/ProductService';
import { formatResponse } from '../../../utils/helpers';

export class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.createProduct(req.body);
      
      res.status(201).json(
        formatResponse(true, product, 'Product created successfully')
      );
    } catch (error: any) {
      res.status(400).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getProducts(req: Request, res: Response) {
    try {
      const { page, limit, search, category, includeStock } = req.query;
      
      const result = await ProductService.getProducts(
        parseInt(page as string) || 1,
        parseInt(limit as string) || 20,
        search as string,
        category as string,
        includeStock === 'true'
      );

      res.json(
        formatResponse(true, result.products, 'Products retrieved successfully', {
          pagination: result.pagination
        })
      );
    } catch (error: any) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { includeStock } = req.query;
      
      const product = await ProductService.getProductById(
        id, 
        includeStock === 'true'
      );

      res.json(
        formatResponse(true, product, 'Product retrieved successfully')
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

  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await ProductService.updateProduct(id, req.body);

      res.json(
        formatResponse(true, product, 'Product updated successfully')
      );
    } catch (error: any) {
      if (error.message === 'Product not found') {
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

  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);

      res.json(
        formatResponse(true, null, 'Product deleted successfully')
      );
    } catch (error: any) {
      if (error.message === 'Product not found') {
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

  static async exportProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.exportProducts();

      res.json(
        formatResponse(true, products, 'Products exported successfully')
      );
    } catch (error: any) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }
}