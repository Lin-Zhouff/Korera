import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl + '/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  // @ts-ignore
  private token: string;
  private tokenTimer: any;
  // @ts-ignore
  private userId: string;
  // @ts-ignore
  private userName: string;
  // @ts-ignore
  private CreateTime : string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return this.token;
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  getUserId(): string {
    return this.userId;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }
  // tslint:disable-next-line:typedef
  createUser(userName: string, password: string) {
    console.log(userName);
    const authData: AuthData = { userName, password };
    this.http.post(BACKEND_URL + '/register', authData).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }
  // tslint:disable-next-line:typedef
  login(userName: string, password: string) {
    const authData: AuthData = { userName, password };
    this.http
      .post<{ jwt: string; userId: string ;Name: string; time: string}>(
        BACKEND_URL + '/login',
        authData
      )
      .subscribe(
        response => {
          const token = response.jwt;
          this.token = token;
          if (token) {
            this.setAuthTimer(3600);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.CreateTime = response.time;
            this.userName = response.Name;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + 3600 * 1000
            );
            this.saveAuthData(token, expirationDate, this.userId, this.userName, this.CreateTime);
            this.router.navigate(['/resources']);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = '';
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  private setAuthTimer(duration: number): void {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string,
                       userName: string, CreateTime: string): void {
    console.log(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('CreateTime', CreateTime);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('CreateTime');
  }

  // tslint:disable-next-line:typedef
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}
