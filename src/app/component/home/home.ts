import { Component } from '@angular/core';
import { Header } from './header/header';
import { Catnavigation } from './catnavigation/catnavigation';
import { CategoryStoreItem } from './services/category/categories.storeItem';
import { CategoryService } from './services/category/category';
import { ProductService } from './services/product/product.service';
import { ProductStoreItem } from './services/product/product.storeItem';
import { SearchKeyword } from './types/searchKeyword';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from './user/service/user.service';
@Component({
  selector: 'app-home',
  imports: [Header, Catnavigation, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [
    CategoryStoreItem,
    CategoryService,
    ProductService,
    ProductStoreItem,
    UserService
  ],
})
export class Home {
  constructor(
    private categoryStoreItem: CategoryStoreItem,
    private productStoreItem: ProductStoreItem,
    private router: Router
  ) {

    // if router is in home url redirect to product
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if ((event as NavigationEnd).url === '/home') {
          router.navigate(['/home/products']);
        }
      });

    // Fetching data from api as soon as home component load
    categoryStoreItem.loadCategories();
    productStoreItem.loadProducts();
  }

  categorySelected(parentCategoryId: number): void {
    this.productStoreItem.loadProducts({ parentCategoryId: parentCategoryId });
  }

  searchOnKeyword(searchedKeyword: SearchKeyword): void {
    this.productStoreItem.loadProducts({
      parentCategoryId: searchedKeyword.categoryId,
      keyword: searchedKeyword.keyword,
    });
  }
}
