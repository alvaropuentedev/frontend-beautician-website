import { Route } from '@angular/router';
import { HomePageComponent } from './page/home-page.component';

export const HOME_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./page/home-page.component').then(m => m.HomePageComponent),
  }
];
