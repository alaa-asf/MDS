import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseComponent } from '../base.component';

@Injectable()
export class TokenInterceptor extends BaseComponent implements HttpInterceptor {

  constructor(
    injector: Injector,
  ) {
    super(injector)
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: { Authorization: `${token}`,'Accept-Language':"en" }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === HttpStatusCode.Unauthorized) {
              this.utility.logout()
          }
        }
        return throwError(error);
      })
    )
  }
}
