import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Notfound } from './component/notfound/notfound';

export const routes: Routes = [
    {path: 'home', component: Home },
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', component: Notfound }
];
