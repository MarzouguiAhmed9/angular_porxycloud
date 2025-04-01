import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './http-token.interceptor';  // Correct path

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,  // Register the interceptor
      multi: true,  // Allow multiple interceptors
    },
  ],
})
export class CoreModule {}
