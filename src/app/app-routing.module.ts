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
        path: 'logout',
        loadComponent: () =>
          import('./demo/pages/authentication/logout/logout.component').then(m => m.LogoutComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./demo/pages/authentication/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('./demo//library/documents/document-manager/document-manager.component').then(m => m.DocumentManagerComponent)
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./demo/library/categories/category/category.component').then(m => m.CategoryComponent)
      },
      {
        path: 'departments',
        loadComponent: () =>
          import('./demo/library/departments/manage-departments/manage-departments.component').then(m => m.ManageDepartmentsComponent)
      },
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
        // Add component or lazy-loaded module here if needed
      },
      {
        path: 'sample-page',
        // Add component or lazy-loaded module here if needed
      },
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
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
