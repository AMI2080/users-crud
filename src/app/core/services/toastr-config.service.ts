import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrConfigService {
  public constructor(private toastr: ToastrService) {}

  public setToastrDirection(dir: 'rtl' | 'ltr'): void {
    if (dir === 'rtl') {
      this.toastr.toastrConfig.positionClass = 'toast-top-left';
    } else {
      this.toastr.toastrConfig.positionClass = 'toast-top-right';
    }
  }
}
