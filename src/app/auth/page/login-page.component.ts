import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AuthStatus } from '../interfaces';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private readonly authService = inject( AuthService );
  private readonly router      = inject( Router );

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffext = effect(() => {
    switch( this.authService.authStatus() ) {
      case AuthStatus.checking:
      return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/admin/home');
      return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
      return;
    }
  });
}
