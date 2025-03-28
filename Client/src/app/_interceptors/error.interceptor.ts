import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { AccountService } from '../_services/account.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService);
  const router = inject(Router);
  const accountService = inject(AccountService);

  return next(req).pipe(
    catchError((err : HttpErrorResponse) => {
      let errorMessage : string;
      console.log(err)
      if (err) {
        switch(err.status) {
          case 400:
            errorMessage = parseErrorMessage(err);
            if (errorMessage)
              toastr.error(errorMessage)
            else
            toastr.error("An error has occurred");
          break;
          case 401:
            if (accountService.isLogged()) {
              accountService.logout();
              toastr.error("Invalid session, please login")
            }
            else {
              errorMessage = parseErrorMessage(err);
              if (errorMessage)
                toastr.error(errorMessage)
              else
              toastr.error("An error has occurred");
          }
          break;
          case 404:
            router.navigateByUrl("/");
            break;
          case 500:
            toastr.error("Server error, try again");
            break;
        }
      }
      throw err;
    })
  )
};

const parseErrorMessage = (err : HttpErrorResponse) => {
  if (err.error?.errors) {
    const [prop] = Object.keys(err.error.errors)
    const firstMessage = err.error.errors[prop][0]
    return firstMessage;
  }
  else if (err.error?.description)
    return err.error.description;
  else if (err.error)
    return err.error;
  return ;
}