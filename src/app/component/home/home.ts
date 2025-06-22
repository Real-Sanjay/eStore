import { Component } from '@angular/core';
import { Header } from './header/header';
import { Catnavigation } from './catnavigation/catnavigation';
import { SidebarNavigation } from '../sidebar-navigation/sidebar-navigation';

@Component({
  selector: 'app-home',
  imports: [Header, Catnavigation, SidebarNavigation],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
