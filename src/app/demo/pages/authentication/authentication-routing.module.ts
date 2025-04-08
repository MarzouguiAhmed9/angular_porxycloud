import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';

import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

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
      {
        
        path: 'forgot',
        loadComponent: () => import('./forgot/forgot.component').then(m => m.ForgotComponent)

      },

      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
    
      
      
      { path: 'logout', component: LogoutComponent },  // Route de déconnexion
      //{ path: 'resetPassword', component: ResetPasswordComponent }, 
      { path: 'profile', component: ProfileComponent }, 

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
