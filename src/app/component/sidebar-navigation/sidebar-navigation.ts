import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../home/types/category';
import { CategoryStoreItem } from '../home/services/categories.storeItem';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [FontAwesomeModule],
  templateUrl: './sidebar-navigation.html',
  styleUrl: './sidebar-navigation.css'
})
export class SidebarNavigation {
faAngleDown = faAngleDown;
private categoryStoreItem = inject(CategoryStoreItem);
readonly categories = this.categoryStoreItem.categories;

getSubCategories(subCategoryId?: number) : Category[] {
  return this.categories().filter((category : Category) => subCategoryId ? category.parent_category_id === subCategoryId : category.parent_category_id === null);
}

}
