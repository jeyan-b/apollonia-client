import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(
    private apiCallService: ApiCallService  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.apiCallService.isLoading$.next(true);
    return next
      .handle(request)
      .pipe(
        finalize(() => {
          this.apiCallService.isLoading$.next(false);
        })
      )
  }
}
