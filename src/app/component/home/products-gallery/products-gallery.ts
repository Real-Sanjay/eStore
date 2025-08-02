import { Component } from '@angular/core';
import { SidebarNavigation } from '../../sidebar-navigation/sidebar-navigation';
import { Products } from '../products/products';
import { ProductStoreItem } from '../services/product/product.storeItem';

@Component({
  selector: 'app-products-gallery',
  imports: [SidebarNavigation, Products],
  templateUrl: './products-gallery.html',
  styleUrl: './products-gallery.css'
})
export class ProductsGallery {

  constructor(private productStoreItem: ProductStoreItem) {
    
  }

   selectedSubCategory(subCategoryId?: number) : void {
      this.productStoreItem.loadProducts({subCategoryId: subCategoryId});
  }

}
