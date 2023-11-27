import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  private user?: string;

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() {
    this.authService.setLoginStatus(false);
  }

  submitForm() {
    this.authService.login(this.loginForm.value as LoginRequest).subscribe(
      () => {
        this.authService.setLoginStatus(true);
        this.router.navigate(['/admin/home']);
      }
    );
  }
}
