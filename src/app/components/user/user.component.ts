import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCogs,
  faCheckCircle,
  faXmark,
  faArrowsRotate,
  faSpinner,
  faStarOfLife,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../core/services/user.sarvice';
import { User } from '../../core/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
})
export class UserComponent {
  @ViewChild('formModal')
  public formModal: TemplateRef<NgbActiveModal>;

  public authType: 'user' | 'admin' | undefined;

  public listLengths: number[] = [2, 5, 10, 20, 50, 100];

  public listLength: number = this.listLengths[0];

  public currentPage: number = 1;

  public users: User[] = [];

  public editForm: FormGroup;

  public edittingUser: User | null = null;

  public isSubmitting: boolean = false;

  public pagesCount: number = 1;

  public constructor(
    private readonly userService: UserService,
    private readonly translateService: TranslateService,
    private readonly toastr: ToastrService,
    private readonly modalService: NgbModal,
    readonly authService: AuthService,
    readonly fa: FaIconLibrary
  ) {
    fa.addIcons(
      faCogs,
      faCheckCircle,
      faEdit,
      faTrashCan,
      faXmark,
      faArrowsRotate,
      faSpinner,
      faStarOfLife
    );

    this.authType = authService.userType;
    this.getUsers(this.currentPage);
  }

  public getUsers(page: number = 1): void {
    this.currentPage = page;
    this.userService
      .get(this.listLength, this.currentPage)
      .pipe(take(1))
      .subscribe((users) => {
        this.users = users;
        this.pagesCount = this.userService.pagesCount;
      });
  }

  public deleteUser(user: User): void {
    Swal.fire({
      title: this.translateService.instant('translate_are_you_sure'),
      icon: 'warning',
      text: this.translateService.instant('translate_soft_deleting_warning'),
      showConfirmButton: true,
      confirmButtonText: this.translateService.instant('translate_soft_delete'),
      showDenyButton: true,
      focusConfirm: true,
      denyButtonText: this.translateService.instant('translate_cancel'),
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-danger me-2',
        denyButton: 'btn btn-outline-success',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(user.id).subscribe((isDelete) => {
          if (isDelete) {
            this.getUsers(this.currentPage);
            this.toastr.success(
              this.translateService.instant(
                'translate_user_temporarily_deleted_successfully'
              )
            );
          }
        });
      }
    });
  }

  public forceDeleteUser(user: User): void {
    Swal.fire({
      title: this.translateService.instant('translate_are_you_sure'),
      icon: 'error',
      text: this.translateService.instant('translate_force_deleting_warning'),
      showConfirmButton: true,
      confirmButtonText: this.translateService.instant(
        'translate_force_delete'
      ),
      showDenyButton: true,
      focusConfirm: true,
      denyButtonText: this.translateService.instant('translate_cancel'),
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-danger me-2',
        denyButton: 'btn btn-outline-success',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.forceDelete(user.id).subscribe((isDelete) => {
          if (isDelete) {
            this.getUsers(this.currentPage);
            this.toastr.success(
              this.translateService.instant(
                'translate_user_force_deleted_successfully'
              )
            );
          }
        });
      }
    });
  }

  public restoreUser(user: User): void {
    Swal.fire({
      title: this.translateService.instant('translate_are_you_sure'),
      icon: 'question',
      text: this.translateService.instant('translate_restore_warning'),
      showConfirmButton: true,
      confirmButtonText: this.translateService.instant('translate_restore'),
      showDenyButton: true,
      focusConfirm: true,
      denyButtonText: this.translateService.instant('translate_cancel'),
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success me-2',
        denyButton: 'btn btn-outline-danger',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.restore(user.id).subscribe((isRestored) => {
          if (isRestored) {
            this.getUsers(this.currentPage);
            this.toastr.success(
              this.translateService.instant(
                'translate_user_restored_successfully'
              )
            );
          }
        });
      }
    });
  }

  public editUser(user: User): void {
    this.edittingUser = user;
    this.initForm();
    this.modalService.open(this.formModal);
  }

  public createUser(): void {
    this.edittingUser = null;
    this.initForm();
    this.modalService.open(this.formModal);
  }

  public submitForm(modal: NgbActiveModal): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.isSubmitting = true;
      if (this.editForm.get('id')?.value) {
        this.userService.update(this.editForm.value).subscribe((isUpdated) => {
          if (isUpdated) {
            this.getUsers(this.currentPage);
            this.isSubmitting = false;
            this.toastr.success(
              this.translateService.instant(
                'translate_user_updated_successfully'
              )
            );
            modal.close();
          }
        });
      } else {
        this.userService.create(this.editForm.value).subscribe((isCreated) => {
          if (isCreated) {
            this.getUsers(this.currentPage);
            this.isSubmitting = false;
            this.toastr.success(
              this.translateService.instant(
                'translate_user_created_successfully'
              )
            );
            modal.close();
          }
        });
      }
    }
  }

  private initForm(): void {
    this.editForm = new FormGroup({
      id: new FormControl(this.edittingUser?.id),
      name: new FormControl(this.edittingUser?.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(this.edittingUser?.email, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.email,
      ]),
      phone: new FormControl(this.edittingUser?.phone, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('[0-9]*'),
      ]),
    });
  }
}
