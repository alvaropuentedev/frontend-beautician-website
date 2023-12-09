import { Route } from '@angular/router';
import { AdminPageComponent } from './page/admin-page.component';

export const ADMIN_ROUTE: Route[] = [
  {
    path: 'home',
    component: AdminPageComponent,
  }
];
