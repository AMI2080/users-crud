import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public loginForm: FormGroup;

  public isSubmitting: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly toastr: ToastrService,
    private readonly fa: FaIconLibrary
  ) {
    this.initLoginForm();
    fa.addIcons(faSpinner);
  }

  private initLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    });
  }

  public submitLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.authService.login(this.loginForm.value).subscribe((response) => {
        this.isSubmitting = false;
        if (response.status === 100) {
          this.router.navigate(['']);
        } else {
          this.toastr.error(
            this.translateService.instant('translate_credentials_are_invalid')
          );
        }
      });
    }
  }
}
