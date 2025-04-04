import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Project imports
import { CardComponent } from './components/card/card.component';

// Bootstrap imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// Import HttpClientModule and provide the interceptor
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Third party
import { NgScrollbarModule } from 'ngx-scrollbar';

// Import the HttpTokenInterceptor
import { HttpTokenInterceptor } from '../../servicesahmed/interceptor/http-token.interceptor';
import { RHModule } from "../../demo/RH componenet/RH.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,  // <-- Import HttpClientModule only once
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    NgbModule,
    NgScrollbarModule,
    NgbCollapseModule,
    RHModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    NgbModule,
    NgScrollbarModule,
    NgbCollapseModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,  // Register the interceptor
      multi: true,  // Allow multiple interceptors
    },
  ],
})
export class SharedModule {}
