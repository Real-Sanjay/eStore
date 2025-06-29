import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { ProductListItem } from './product';
import { Ratings } from "../../ratings/ratings";

@Component({
  selector: 'app-products',
  imports: [Ratings],
  templateUrl: './products.html',
  styleUrl: './products.css',
  providers: [ProductService]
})
export class Products {

products : ProductListItem[] = [];

constructor(private productService: ProductService){
  this.products = this.productService.getProducts();
}

}
