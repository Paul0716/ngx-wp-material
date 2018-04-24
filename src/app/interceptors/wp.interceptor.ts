

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class WpInterceptor implements HttpInterceptor {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {

      // 如果正常回傳
      if (event instanceof HttpResponse) {
        // console.log(`url: ${event.url}`);
        // console.log(`body: ${event.body}`);
        // console.log(`headers: ${event.headers.get('x-wp-totalpages')}`);
        return event;
      }

    },
    // 錯誤處理
    (response: any) => {

      if (response instanceof HttpErrorResponse) {
        const err = response.error;
        this._snackBar.open(`code: ${err.code}, message: ${err.message}`, 'Close');
      }

    });
  }
}
