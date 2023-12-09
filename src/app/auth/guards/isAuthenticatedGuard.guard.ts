import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router = inject( Router );

  console.log({ status: authService.authStatus() })

  if ( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }

  if ( authService.authStatus() ===  AuthStatus.checking ) {
    return false;
  }

  router.navigateByUrl('/auth/login');
  return false;
};
