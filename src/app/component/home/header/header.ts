import { Component, output, signal } from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoryStoreItem } from '../services/category/categories.storeItem';
import { SearchKeyword } from '../types/searchKeyword';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
faSearch = faSearch;
faUserCircle = faUserCircle;
faShoppingCart = faShoppingCart;
readonly searchedProducts = output<SearchKeyword>();
displaySearch = signal(true);

constructor(public categoryStore : CategoryStoreItem, private route: Router){
  this.route.events.pipe(
    filter((event) => event instanceof NavigationEnd)
  ).subscribe((event) => {
    this.displaySearch.set(event.url === '/home/products');
  })
}


onSearchButtonClick(categoryId: string, keyword: string) {
  this.searchedProducts.emit( {
    categoryId: parseInt(categoryId),
    keyword: keyword,
  });
}

}
