import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

interface AuthResponse {
  message: string;
  status: 100 | 102;
  data: {
    type?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private resposeTime: number = 2; // In seconds

  private isLogin: boolean = false;

  public get userName(): string {
    return this.users.find((user) => user.type === this.type)?.name ?? '';
  }

  public get userType(): 'admin' | 'user' | undefined {
    return this.type;
  }

  private users: { type: string; name: string }[] = [
    { type: 'admin', name: 'Admin' },
    { type: 'user', name: 'User' },
  ];

  private type: 'admin' | 'user' | undefined = undefined;

  private storageName: string = 'auth';

  public constructor(private readonly router: Router) {}

  public login(credentials: {
    username: string;
    password: string;
  }): Observable<AuthResponse> {
    return new Observable((observer) => {
      setTimeout(() => {
        if (credentials.password == '123456') {
          if (credentials.username === 'admin') {
            this.type = 'admin';
          } else if (credentials.username === 'user') {
            this.type = 'user';
          }
          this.isLogin = true;
        }
        if (this.isLogin && this.type !== undefined) {
          localStorage.setItem(this.storageName, `${this.type}`);
          observer.next({
            message: 'login_successfully',
            status: 100,
            data: { type: this.type },
          });
        } else {
          this.logout();
          observer.next({
            message: 'invalid_username_or_passowrd',
            status: 102,
            data: {},
          });
        }
      }, this.resposeTime * 1000);
    });
  }

  public check(): Observable<boolean> {
    return new Observable((observable) => {
      switch (localStorage.getItem(this.storageName)) {
        case 'admin':
          this.type = 'admin';
          observable.next(true);
          break;

        case 'user':
          this.type = 'user';
          observable.next(true);
          break;

        default:
          this.type = undefined;
          observable.next(false);
          break;
      }
    });
  }

  public logout(): Observable<void> {
    return new Observable((observer) => {
      localStorage.removeItem(this.storageName);
      observer.next();
    });
  }
}
