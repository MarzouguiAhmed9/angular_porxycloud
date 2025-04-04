import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./demo/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'categories',
        children: [
          {
            path: 'add',
            loadChildren: () =>
              import('./library/categories/category/category.module').then(m => m.CategoryModule)
          }
        ]
      }
      
      ,
      {
        path: 'basic',
        loadChildren: () =>
          import('./demo/ui-elements/ui-basic/ui-basic.module').then(m => m.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./demo/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./demo/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'apexchart',
        // Define or lazy-load your ApexChart module/component as needed
      },
      {
        path: 'sample-page',
        // Define or lazy-load your Sample Page module/component as needed
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./library/documents/document.module').then(m => m.DocumentModule)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
