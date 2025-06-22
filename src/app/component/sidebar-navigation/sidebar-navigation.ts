import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../home/types/category';
import { CategoryService } from '../home/services/category';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [FontAwesomeModule],
  templateUrl: './sidebar-navigation.html',
  styleUrl: './sidebar-navigation.css'
})
export class SidebarNavigation {
faAngleDown = faAngleDown;
categories : Category[] = [];

constructor(private categoryService: CategoryService) {
this.getAllCategories();
}

getAllCategories() {
  this.categories = this.categoryService.getAllCategories();
}

getSubCategories(subCategoryId?: number) : Category[] {
  return this.categories.filter(category => category.parentCategoryId === subCategoryId);
}

}
