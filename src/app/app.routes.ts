import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Notfound } from './component/notfound/notfound';
import { ProductsGallery } from './component/home/products-gallery/products-gallery';
import { ProductDetail } from './component/home/product-detail/product-detail';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./component/home/home').then((c) => c.Home),
    children: [
      {
        path: 'products',
        component: ProductsGallery,
      },
      {
        path: 'product/:id',
        component: ProductDetail,
      }
    ],
  },
  { path: '', redirectTo: '/home/products', pathMatch: 'full' },
  { path: '**', component: Notfound },
];
