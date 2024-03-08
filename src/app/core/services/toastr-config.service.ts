import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrConfigService {
  constructor(private toastr: ToastrService) {}

  setToastrDirection(dir: 'rtl' | 'ltr'): void {
    if (dir === 'rtl') {
      this.toastr.toastrConfig.positionClass = 'toast-top-left';
    } else {
      this.toastr.toastrConfig.positionClass = 'toast-top-right';
    }
  }
}
