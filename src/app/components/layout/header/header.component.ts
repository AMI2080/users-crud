import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faAddressCard,
  faArrowRightFromBracket,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  key: string;
  name: string;
  label: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public userName: string;

  public languages: Language[] = [
    {
      key: 'en',
      name: 'english',
      label: 'translate_english',
    },
    {
      key: 'ar',
      name: 'arabic',
      label: 'translate_arabic',
    },
  ];

  public constructor(
    private readonly translateService: TranslateService,
    private readonly router: Router,
    readonly authService: AuthService,
    readonly fa: FaIconLibrary
  ) {
    this.userName = authService.userName;

    fa.addIcons(faUser, faAddressCard, faArrowRightFromBracket, faGlobe);
  }

  public changeLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  public isCurrentLang(lang: Language): boolean {
    return this.translateService.currentLang === lang.key;
  }

  public logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['', 'login']);
    });
  }
}
