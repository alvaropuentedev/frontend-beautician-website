import { Route } from '@angular/router';
import { AdminPageComponent } from './page/admin-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';

export const ADMIN_ROUTE: Route[] = [
  {
    path: 'home',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  }
];
