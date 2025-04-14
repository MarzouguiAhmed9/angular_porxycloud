import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { ClientComponent } from '../app/client/client.component'; // Vous devrez créer ce composant

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
      { 
        path: 'tache', 
        loadComponent: () => import('./demo/pages/Projet/tache/tache.component').then(m => m.TacheComponent) 
      },
      { 
        path: 'projet', 
        loadComponent: () => import('./demo/pages/Projet/projet/projet.component').then(m => m.ProjetComponent) 
      },
      { 
        path: 'logout', 
        loadComponent: () => import('./demo/pages/authentication/logout/logout.component').then(m => m.LogoutComponent) 
      },
      { 
        path: 'profile', 
        loadComponent: () => import('./demo/pages/authentication/profile/profile.component').then(m => m.ProfileComponent) 
      },
      { 
        path: 'list', 
        loadComponent: () => import('./demo/pages/authentication/listusers/listusers.component').then(m => m.ListusersComponent) 
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(m => m.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./demo/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'apexchart',
      },
      {
        path: 'sample-page',
      }
    ]
  },
  {
    path: 'client',
    component: ClientComponent,
    children: [
      { 
        path: '', 
        loadChildren: () => import('../app/client/client-routing.module').then(m => m.ClientRoutingModule)
      }
    ]
  },,
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}