import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCogs,
  faCheckCircle,
  faXmark,
  faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../core/services/user.sarvice';
import { User } from '../../core/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
})
export class UserComponent {
  public users: User[] = [];

  public constructor(
    private readonly translateService: TranslateService,
    private readonly toastr: ToastrService,
    readonly userService: UserService,
    readonly fa: FaIconLibrary
  ) {
    fa.addIcons(
      faCogs,
      faCheckCircle,
      faEdit,
      faTrashCan,
      faXmark,
      faArrowsRotate
    );

    userService.get().subscribe((users) => {
      this.users = users;
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
            this.toastr.success(
              this.translateService.instant(
                'translate_user_deleted_successfully'
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
}
