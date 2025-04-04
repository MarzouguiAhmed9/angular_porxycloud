import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RHRoutingModule } from './RH-routing.module';
import { ApplicationComponent } from "./application/application.component";  // Ensure your routing is set up

@NgModule({
  declarations: [
    ApplicationComponent,  // Declare the component here
  ],
  imports: [
    CommonModule,
    FormsModule,  // Import FormsModule to use ngModel
    RHRoutingModule  // Your routing module if any
  ],
  exports: []  // Optionally export it if you want to use it elsewhere
})
export class RHModule {}
