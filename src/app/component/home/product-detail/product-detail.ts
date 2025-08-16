import { Component, inject, signal } from '@angular/core';
import { Ratings } from "../../ratings/ratings";
import { ProductService } from '../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../types/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartStoreItem } from '../services/cart/cart.storeItem';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-product-detail',
  imports: [Ratings, FontAwesomeModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {

  private readonly route  = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartStoreItem = inject(CartStoreItem)
  faShoppingCart = faShoppingCart;
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


  addToCart() {
    // Storing it in a variable since we cant bind signal value directly
    const product = this.product();
    if(product) {
      this.cartStoreItem.addProducts(product);
      console.log(this.cartStoreItem.cart())
      console.log(this.cartStoreItem.totalQuantity())
    }

  }
}
