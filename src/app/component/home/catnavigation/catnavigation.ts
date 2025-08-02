import { Component, inject, output, signal } from '@angular/core';
import { CategoryStoreItem } from '../services/category/categories.storeItem';
import { Category } from '../types/category';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-catnavigation',
  imports: [RouterLink],
  templateUrl: './catnavigation.html',
  styleUrl: './catnavigation.css'
})
export class Catnavigation {

  displayOptions = signal(true);
  readonly categoryIdClicked = output<number>();

  constructor(public categoryStore: CategoryStoreItem, private route: Router){
    route.events.pipe(
      filter((event) => event instanceof  NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.displayOptions.set(event.url === '/home/products')
    })

  }


  onCategoryIdClicked(parentCatId: Category) {
    this.categoryIdClicked.emit(parentCatId.id);
  }
}
