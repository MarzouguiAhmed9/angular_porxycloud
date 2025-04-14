import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientDashboardComponent } from './components/dashboard/dashboard.component';
import { MyItemsComponent } from './components/my-items/my-items.component';
import { CartComponent } from './components/cart/cart.component';
import { ItemFormComponent } from '../marketplace/item-form/item-form.component';
import { ClientComponent } from './client.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ClientComponent,
    RouterModule // Import RouterModule to enable routerLink
  ]
})
export class ClientModule { }