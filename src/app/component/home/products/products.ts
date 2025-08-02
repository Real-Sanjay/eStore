import { Component } from '@angular/core';
import { Product } from '../types/product';
import { Ratings } from "../../ratings/ratings";
import { ProductStoreItem } from '../services/product/product.storeItem';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [Ratings, FontAwesomeModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {

  faBoxOpen = faBoxOpen;

constructor(public productStore: ProductStoreItem){
}

}
