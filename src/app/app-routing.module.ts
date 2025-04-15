import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { HomeComponent } from 'src/Front_client/component/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
     
    
{ path: 'logout', loadComponent: () => import('./demo/pages/authentication/logout/logout.component').then(m => m.LogoutComponent) }
,

{ path: 'profile', loadComponent: () => import('./demo/pages/authentication/profile/profile.component').then(m => m.ProfileComponent) }
,
{ path: 'list', loadComponent: () => import('./demo/pages/authentication/listusers/listusers.component').then(m => m.ListusersComponent) }
,


      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component').then((m) => m.DashboardComponent)
      },
      {
        path: 'diploma',
        loadChildren: () => import('./demo/diploma/diploma.module').then((m) => m.DiplomaModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then((m) => m.FormElementsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./demo/pages/tables/tables.module').then((m) => m.TablesModule)
      },
      {
        path: 'apexchart'
      },
      {
        path: 'sample-page'
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
      },
      {
        path: 'front',
        loadChildren: () => import('../Front_client/front/front.module').then(m => m.FrontModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
