import { Route } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';

export const ADMIN_ROUTE: Route[] = [
  {
    path: 'home',
    component: AdminPageComponent,
  }
];
