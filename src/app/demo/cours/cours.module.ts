import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursRoutingModule } from './cours-routing.module';
//import { ReactiveFormsModule } from '@angular/forms'; // <-- Import here
import { CoursFormComponent } from './components/cours-form/cours-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTestComponent } from './components/update-test/update-test.component';
import { RouterModule } from '@angular/router';
import { TestTableComponent } from './components/test-table/test-table.component';



@NgModule({
  declarations: [],
  imports: [
     CommonModule,
     CoursRoutingModule,
     FormsModule,
     ReactiveFormsModule,
  ]
})
export class CoursModule { }
