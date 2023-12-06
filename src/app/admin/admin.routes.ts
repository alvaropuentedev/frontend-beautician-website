import { Route } from '@angular/router';
import { AdminPageComponent } from './page/admin-page.component';
import { authGuard } from '../auth/guards/auth.guard';

export const ADMIN_ROUTE: Route[] = [
  {
    path: 'home',
    component: AdminPageComponent,
    canActivate: [authGuard],
  }
];
