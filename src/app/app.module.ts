import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { ToastrConfigService } from './core/services/toastr-config.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import {
  LayoutComponent,
  HeaderComponent,
  FooterComponent,
} from './components/layout';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbModule,
    SweetAlert2Module,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      preventDuplicates: false,
    }),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private translateService: TranslateService,
    private titleService: Title,
    toastrConfigService: ToastrConfigService
  ) {
    const appLang = localStorage.getItem('lang') ?? 'en';
    this.translateService.setDefaultLang('en');
    this.translateService.use(appLang);
    this.translateService.onLangChange.subscribe((event) => {
      const dir: 'rtl' | 'ltr' = event.lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
      document.documentElement.lang = event.lang;
      toastrConfigService.setToastrDirection(dir);
      localStorage.setItem('lang', event.lang);
      const translatedTitle = this.translateService.instant(
        'translate_app_title'
      );
      this.titleService.setTitle(translatedTitle);
    });
  }
}
