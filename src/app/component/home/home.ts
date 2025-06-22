import { Component } from '@angular/core';
import { Header } from './header/header';
import { Catnavigation } from './catnavigation/catnavigation';
import { SidebarNavigation } from '../sidebar-navigation/sidebar-navigation';
import { Products } from "./products/products";

@Component({
  selector: 'app-home',
  imports: [Header, Catnavigation, SidebarNavigation, Products],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
