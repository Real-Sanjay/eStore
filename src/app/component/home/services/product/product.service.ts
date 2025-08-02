import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../../types/product';
import { Observable } from 'rxjs';
@Injectable()
export class ProductService {
  apiUrl = 'http://localhost:5000/products';

  constructor(private http: HttpClient) {}

  getAllProducts(filter?: {
    parentCategoryId?: number;
    subCategoryId?: number;
    keyword?: string;
  }): Observable<Product[]> {
    let params = new HttpParams();
    if (
      filter?.parentCategoryId !== undefined &&
      filter?.parentCategoryId !== null
    ) {
      params = params.set('parentCategoryId', filter.parentCategoryId.toString());
    }
    if (filter?.subCategoryId !== null && filter?.subCategoryId !== undefined) {
      params = params.set('subCategoryId', filter.subCategoryId.toString());
    }
     
    if(filter?.keyword !== null && filter?.keyword !== undefined) {
      params = params.set('keyword', filter?.keyword);
    }
    return this.http.get<Product[]>(this.apiUrl, {params});
  }

  getProduct(productId: number) : Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }
}
