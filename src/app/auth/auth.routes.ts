import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const AUTH_ROUTE: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  }
];
