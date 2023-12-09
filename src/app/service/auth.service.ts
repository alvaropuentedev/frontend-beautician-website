import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { enviroment } from '../../environments/environments';
import { AuthStatus, LoginResponse, User } from '../auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly router = inject(Router);
  private readonly baseUrl: string = enviroment.base_url ;

  // Set Loading
  private isLoginSubject = new BehaviorSubject<boolean>(true);
  public isLogin$ = this.isLoginSubject.asObservable();

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Exposed
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  public user: any;

  // private baseUrl = 'http://localhost:8080';

  constructor() {
    this.checkTokenIsActive().subscribe();
  }

  checkToken() {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  setLoginStatus(status: boolean) {
    this.isLoginSubject.next(status);
  }

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { username, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ username, token }) => {
        this.user = username;
        this._currentUser.set(username);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);
        localStorage.setItem('user', this.user);
      }),
      map(() => true),

      catchError(err => {
        return throwError(() => err);
      })
      );
    }

  logout() {
    this.user = undefined;
    this.isLoginSubject.next(false);
    localStorage.removeItem('token');
  }

  public checkTokenIsActive(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    this.user = user;
    const checkToken = this.jwtHelper.isTokenExpired(token);

    if (!checkToken) {
      this._currentUser.set(this.user);
      this._authStatus.set(AuthStatus.authenticated);
      return of(true);
    }
    this.user = null;
    this._authStatus.set(AuthStatus.notAuthenticated);
    return of(false);
  }
}
