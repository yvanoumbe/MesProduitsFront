// token.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const toExclude = "/login";
    if (request.url.search(toExclude) === -1) {
      let jwt = this.authService.getToken();
      let reqWithToken = request.clone({
        setHeaders: { Authorization: "Bearer " + jwt }
      });
      return next.handle(reqWithToken);
    }
    return next.handle(request);
  }
}
