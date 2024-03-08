import { Injectable } from '@angular/core';
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
  public isLogin: boolean = false;

  public userType: 'admin' | 'user' | undefined = undefined;

  private resposeTime: number = 2; // In seconds

  private storageName: string = 'auth';

  public login(credentials: {
    username: string;
    password: string;
  }): Observable<AuthResponse> {
    return new Observable((observer) => {
      setTimeout(() => {
        if (credentials.password == '123456') {
          if (credentials.username === 'admin') {
            this.userType = 'admin';
          } else if (credentials.username === 'user') {
            this.userType = 'user';
          }
          this.isLogin = true;
        }
        if (this.isLogin && this.userType !== undefined) {
          localStorage.setItem(this.storageName, `${this.userType}`);
          observer.next({
            message: 'login_successfully',
            status: 100,
            data: { type: this.userType },
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
    return of(
      ['admin', 'user'].includes(localStorage.getItem(this.storageName))
    );
  }

  public logout(): void {
    return localStorage.removeItem(this.storageName);
  }
}
