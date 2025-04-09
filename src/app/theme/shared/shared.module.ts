import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Project import
import { CardComponent } from './components/card/card.component';

// Bootstrap import
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// Import HttpClientModule only once
import { HttpClientModule } from '@angular/common/http';

// Third party
import { NgScrollbarModule } from 'ngx-scrollbar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,  // <-- Import HttpClientModule only once
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    NgbModule,  // Importez RouterModule ici
    NgScrollbarModule,
    NgbCollapseModule,
    

    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    NgbModule,
    NgScrollbarModule,
    NgbCollapseModule
  ]
})
export class SharedModule {}
