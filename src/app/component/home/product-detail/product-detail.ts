import { Component, inject, signal } from '@angular/core';
import { Ratings } from "../../ratings/ratings";
import { ProductService } from '../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../types/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  imports: [Ratings],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  private readonly route  = inject(ActivatedRoute)
  private readonly productService = inject(ProductService)
  readonly product = signal<Product | null>(null);

  constructor() {
    const paramId = this.route.snapshot.paramMap.get('id');
    const id = paramId ? Number(paramId) : null;
    if(id !== null && !isNaN(id)) {
      this.productService.getProduct(id).pipe(
        takeUntilDestroyed()
      ).subscribe((product) => {
        this.product.set(Array.isArray(product) ? product[0] : product) // to handle both if res is array or just one object
      })
    }
  }
}
