import {
  computed,
  effect,
  Injectable,
  signal,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CartItem } from '../../types/cart.item';
import { Product } from '../../types/product';
import { Cart } from '../../cart/cart';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class CartStoreItem {

  /* To confirm code is running in browser and not in node */
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Stores all the cartItems as array of objects
  private readonly _products = signal<CartItem[]>(
    this.isBrowser ? this.loadFromSessionStorage() : []
  );

  savedEffect = effect(() => {
    const products = this._products();
    if (products.length > 0) {
      sessionStorage.setItem('cartItems', JSON.stringify(products));
    } else {
      sessionStorage.removeItem('cartItems');
    }
  });

  // Every time _products updated total amount of all product is calculated here
  readonly totalAmount = computed(() =>
    this._products().reduce(
      (total, product) => (total += Number(product.amount)),
      0
    )
  );

  // Every time _products updated total quantity of all product is calculated here
  readonly totalQuantity = computed(() =>
    this._products().reduce(
      (total, product) => (total += Number(product.quantity)),
      0
    )
  );

  // Cart value getter
  readonly cart = computed(() => ({
    products: this._products(),
    totalAmount: this.totalAmount(),
    totalQuantity: this.totalQuantity(),
  }));

  // Add or update  product
  addProducts(product: Product): void {
    const currentProductValues = this._products();
    const existingIndex = currentProductValues.findIndex(
      (item) => product.id === item.product.id
    );

    if (existingIndex === -1) {
      this._products.set([
        ...currentProductValues, // Array of existing cart items
        // Adding new product object to cart items array of objects
        {
          product,
          quantity: 1,
          amount: Number(product.price),
        },
      ]);
    } else {
      // Saving cuttent cart items by copy
      const updatedItems = [...currentProductValues];
      const existingProduct = updatedItems[existingIndex]; // Getting matched cart item based on product id
      // Updating the cart Items
      updatedItems[existingIndex] = {
        ...existingProduct, // existing product
        // updating new qnt and amt
        quantity: existingProduct.quantity + 1,
        amount: existingProduct.amount + Number(product.price),
      };
      // final update for _products cart items
      this._products.set(updatedItems);
    }
  }

  // To update the cart quantity from cart section

  updateCart(cartItem: CartItem): void {
    const updatedItem = this._products()
      .map((item) => {
        if (item.product.id === cartItem.product.id) {
          if (cartItem.quantity <= 1) {
            return null;
          }
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
            amount: cartItem.amount - Number(cartItem.product.price),
          };
        }
        return item;
      })
      .filter(Boolean) as CartItem[];
    this._products.set(updatedItem);
  }

  // To remove the product from cart

  removeItem(cartItem: CartItem) {
    const updatedItem = this._products().filter(
      (item) => item.product.id !== cartItem.product.id
    );
    this._products.set(updatedItem);
  }

  loadFromSessionStorage(): CartItem[] {
    const cartItems = sessionStorage.getItem('cartItems');

    try {
      return cartItems ? JSON.parse(cartItems) : [];
    } catch {
      return [];
    }
  }
}
