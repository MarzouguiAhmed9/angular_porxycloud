import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from "../token/token.service";
import { environment } from '../../../environments/environment';  // Import environment settings for logging

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if (environment.production) {
      console.log('Interceptor triggered');
    } else {
      console.log('Token in localStorage:', token);  // Log only in development mode
    }

    if (token) {
      // Clone the request and add Authorization header with token
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!environment.production) {
        console.log('Cloned request with Authorization header');
      }

      return next.handle(cloned);
    }

    if (!environment.production) {
      console.log('No token found, request sent without Authorization');
    }

    // If no token is found, simply forward the request as is
    return next.handle(req);
  }
}
