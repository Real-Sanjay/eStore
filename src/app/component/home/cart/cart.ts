import { Component, inject } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../types/cart.item';
import { CartStoreItem } from '../services/cart/cart.storeItem';
import {  Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Ratings } from '../../ratings/ratings';
@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule, CommonModule, Ratings],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  faTrash = faTrash;
  faShoppingCart = faShoppingCart;
  faBoxOpen =  faBoxOpen;
  route = inject(Router)
  constructor(public cartStoreItem : CartStoreItem) {
    console.log("cart", cartStoreItem.cart());
  }

  navigateToHome() : void {
    this.route.navigate(['home/products'])
  }

  decreaseQnty($event: any, cartItem: CartItem) : void {
    if($event.target.innerText === '+') {
      this.cartStoreItem.addProducts(cartItem.product);
    } else if($event.target.innerText === '-') {
      this.cartStoreItem.updateCart(cartItem);
    }
  }

  removeItemFromCart(cartItem: CartItem) : void {
    this.cartStoreItem.removeItem(cartItem);
  }
}
