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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageSerive: MessageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMsg = '';

        if (err.error instanceof ErrorEvent) {
          errorMsg = `Error: ${err.error.message}`;
        } else {
          errorMsg = `Error Code: ${err.status}, Message: ${err.message}`;
        }
        this.messageSerive.add(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
