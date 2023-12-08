import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../auth/interfaces/authResponse.interface';
import { LoginRequest } from '../auth/interfaces/loginRequest.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { enviroment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly router = inject(Router);
  private readonly baseUrl: string = enviroment.base_url ;

  private isLoginSubject = new BehaviorSubject<boolean>(true);
  private user?: string;
  private userToken?: string;
  public isLogin$ = this.isLoginSubject.asObservable();

  constructor() {
    // this.baseUrl = 'http://localhost:8080/auth';

    // ? is there token?
    this.checkToken() ? this.router.navigate(['/admin/home']) : this.router.navigate(['/auth/login']);

    this.userToken = localStorage.getItem('user') ?? undefined;
    this.userToken ? (this.user = this.userToken) : (this.user = undefined);
  }

  get currentUser(): string | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  checkToken() {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  setLoginStatus(status: boolean) {
    this.isLoginSubject.next(status);
  }

  login(formValue: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, formValue).pipe(
      tap(user => (this.user = user.username)),
      tap(user => localStorage.setItem('user', user.username)),
      tap(token => localStorage.setItem('token', token.token))
    );
  }

  logout() {
    this.user = undefined;
    this.isLoginSubject.next(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
