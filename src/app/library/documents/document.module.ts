import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentRoutingModule } from './document-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentAddComponent } from './document-add/document-add.component';

@NgModule({
  imports: [
    CommonModule,
    DocumentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DocumentListComponent,  
    DocumentAddComponent   
  ]
})
export class DocumentModule { }
