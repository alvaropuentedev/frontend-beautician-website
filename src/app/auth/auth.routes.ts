import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

export const AUTH_ROUTE: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  }
];
