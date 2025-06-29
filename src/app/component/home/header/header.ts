import { Component } from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoryStoreItem } from '../services/categories.storeItem';


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

constructor(public categoryStore : CategoryStoreItem){}
}
