import { Component } from '@angular/core';
import { Header } from './header/header';
import { Catnavigation } from './catnavigation/catnavigation';
import { SidebarNavigation } from '../sidebar-navigation/sidebar-navigation';
import { Products } from "./products/products";
import { CategoryStoreItem } from './services/categories.storeItem';
import { CategoryService } from './services/category';

@Component({
  selector: 'app-home',
  imports: [Header, Catnavigation, SidebarNavigation, Products],
  templateUrl: './home.html',
  styleUrl: './home.css', 
  providers: [ CategoryStoreItem, CategoryService]
})
export class Home {
  constructor(private categoryStoreItem : CategoryStoreItem){
    categoryStoreItem.loadCategories(); 
  }


}
