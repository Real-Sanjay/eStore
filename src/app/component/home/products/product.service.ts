import { Injectable } from '@angular/core';
import { ProductListItem } from './product';
import { products } from './product.data';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts() : ProductListItem[] {
     return products;
  }

}
