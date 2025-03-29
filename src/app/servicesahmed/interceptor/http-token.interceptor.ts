import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from "../token/token.service";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    console.log('Interceptor triggered');
    console.log('Token in localStorage:', token);  // Log the token

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Attach the token
        }
      });
      console.log('Cloned request with Authorization header');
      return next.handle(cloned);
    }

    console.log('No token found, request sent without Authorization');
    return next.handle(req);  // No token, just pass the request
  }
}
