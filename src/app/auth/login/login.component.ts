import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  private readonly fb          = inject( FormBuilder );
  private readonly authService = inject( AuthService );
  private readonly router      = inject( Router );


  public buttonLogin = false;
  public showAlert = false;

  public loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() {
    this.authService.setLoginStatus(false);
  }

  submitForm() {
    this.buttonLogin = true;
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: () => {
        this.authService.setLoginStatus(true);
        this.router.navigateByUrl('/admin/home');
        this.buttonLogin = false;
      },
      error: () => {
        this.buttonLogin = false;
        this.showAlert = true;
        setTimeout( () => {
          this.showAlert = false;
        }, 3000);

      }
    }

    );
  }

}
