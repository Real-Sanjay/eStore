import { ProductService } from './product.service';
import { Product } from '../../types/product';
import { Injectable, signal } from '@angular/core';

@Injectable()
export class ProductStoreItem {
  // Stores product data as private member
  private _products = signal<Product[]>([]);

  // Read only version of product data
  readonly products = this._products.asReadonly();

  constructor(private productService: ProductService) {
    // Fetch products as soon as the store called
    this.loadProducts();
  }

  // Call the product service to fetch data inside signal
  loadProducts(filter?: {
    parentCategoryId?: number;
    subCategoryId?: number;
    keyword?: string;
  }) {
    this.productService.getAllProducts(filter).subscribe((products) => {
      this._products.set(products);
    });
  }
}
