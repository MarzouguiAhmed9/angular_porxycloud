import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontRoutingModule } from './front-routing.module';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [],  // ✅ Ajout du composant
imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FrontRoutingModule
  ]
})
export class FrontModule { }
