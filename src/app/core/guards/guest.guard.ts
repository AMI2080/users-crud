import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public canActivate(): Observable<boolean | UrlTree> {
    return this.handleCanActivate();
  }

  public canActivateChild(): Observable<boolean | UrlTree> {
    return this.handleCanActivate();
  }

  private handleCanActivate(): Observable<boolean | UrlTree> {
    return this.authService.check().pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['']);
        }
      })
    );
  }
}
