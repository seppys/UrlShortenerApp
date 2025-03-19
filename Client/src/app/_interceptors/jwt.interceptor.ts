import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const item = localStorage.getItem("user");
  let user;

  if (item)
    user = JSON.parse(item)

  if (user?.token) {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: "Bearer " + user.token
      }
    })

    return next(cloneReq);
  }

  return next(req);
};
