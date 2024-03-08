import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faAddressCard,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    readonly fa: FaIconLibrary
  ) {
    fa.addIcons(faUser, faAddressCard, faArrowRightFromBracket);
  }

  public logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['', 'login']);
    });
  }
}
