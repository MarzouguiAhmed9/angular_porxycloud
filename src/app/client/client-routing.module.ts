import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './components/dashboard/dashboard.component';
import { MyItemsComponent } from './components/my-items/my-items.component';
import { CartComponent } from './components/cart/cart.component';
import { ItemFormComponent } from '../marketplace/item-form/item-form.component';
import { ClientComponent } from './client.component';

const routes: Routes = [
  { 
    path: '', 
    component: ClientComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ClientDashboardComponent },
      { path: 'my-items', component: MyItemsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'items/new', component: ItemFormComponent },
      { path: 'items/edit/:id', component: ItemFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }