import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const toastr = inject(ToastrService);

  const user = localStorage.getItem("user");
    if (user)
      return true;
    toastr.error("Unauthorized")
    return false;
};