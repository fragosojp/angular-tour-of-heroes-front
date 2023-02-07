import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageSerive: MessageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
        let errorMsg = '';

        if (err.error instanceof ErrorEvent) {
          errorMsg = `Error: ${err.error.message}`;
        } else if (Array.isArray(err.error) && err.error.length) {
          errorMsg = `Error: ${err.error[0]}`;
        } else if (err.error.errors) {
          errorMsg = `Error: ${err.error.errors}`;
        } else {
          errorMsg = `Error Code: ${err.status}, Message: ${err.message}`;
        }
        this.messageSerive.add(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
