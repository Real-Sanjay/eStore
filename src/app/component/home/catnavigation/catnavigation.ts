import { Component, inject } from '@angular/core';
import { CategoryStoreItem } from '../services/categories.storeItem';

@Component({
  selector: 'app-catnavigation',
  imports: [],
  templateUrl: './catnavigation.html',
  styleUrl: './catnavigation.css'
})
export class Catnavigation {

  constructor(public categoryStore: CategoryStoreItem){}


}
