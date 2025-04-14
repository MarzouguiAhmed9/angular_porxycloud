import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PendingItemsComponent } from './components/pending-items/pending-items.component';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    PendingItemsComponent
  ],
  exports: [
    PendingItemsComponent
  ]
})
export class AdminModule { }
