import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../auth/interfaces/authResponse.interface';
import { LoginRequest } from '../auth/interfaces/loginRequest.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private baseUrl: string;

  private isLoginSubject = new BehaviorSubject<boolean>(true);
  private user?: string;
  public isLogin$ = this.isLoginSubject.asObservable();

  constructor() {
    // this.baseUrl = 'http://localhost:8080/auth';
    this.baseUrl = 'https://backend-beautician-website-production.up.railway.app/auth';
  }

  get currentUser(): string | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  setLoginStatus(status: boolean) {
    this.isLoginSubject.next(status);
  }

  login(formValue: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, formValue)
      .pipe(
        tap((user) => (this.user = user.username)),
        tap((user) => this.cookieService.set('user', user.username, 1)),
        tap((token) => this.cookieService.set('token', token.token, 1))
      );
  }

  logout() {
    this.user = undefined;
    this.isLoginSubject.next(false);
    this.cookieService.deleteAll();
  }
}
