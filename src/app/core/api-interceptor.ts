import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('→', req.method, req.url);
  return next(req.clone({ setHeaders: { 'X-App': 'kundenportal' } }));
};
