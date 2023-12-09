import { Route } from '@angular/router';

export const AUTH_ROUTE: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
    import('./page/login-page.component').then(m => m.LoginPageComponent),
  }
];
