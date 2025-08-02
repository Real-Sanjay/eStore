import { computed, Injectable, signal } from '@angular/core';
import { Category } from '../../types/category'; 
import { CategoryService } from './category';

@Injectable()

export class CategoryStoreItem {
  // private signal value which has whole data
  private readonly _categories = signal<Category[]>([]);

  // read only copy of data
  readonly categories = this._categories.asReadonly();

  // filter only parent categories
   readonly topLevelCategories = computed(() => {
     const result:Category[] = this._categories().filter((cat) => {
      return cat.parent_category_id === null;
      });
      return result;
  });


  // initializes categories data
  constructor(private categoryService: CategoryService) {
    this.loadCategories();
  }
  // calls categories data from server with help of http service
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((categ) => {
      this._categories.set(categ);
    });
  }
}
