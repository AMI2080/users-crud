import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCogs,
  faCheckCircle,
  faEraser,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../core/services/user.sarvice';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
})
export class UserComponent {
  public users: User[] = [];

  public constructor(
    readonly userService: UserService,
    readonly fa: FaIconLibrary
  ) {
    fa.addIcons(faCogs, faCheckCircle, faEdit, faTrashCan, faEraser);

    userService.get().subscribe((users) => {
      this.users = users;
    });
  }
}
