import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        loadComponent: () => import('./auth-signin/auth-signin.component')
      },
      {

        path: 'signup',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },


      { path: 'logout', component: LogoutComponent },  // Route de déconnexion

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
