import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import AuthSigninComponent from './auth-signin/auth-signin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotComponent } from './forgot/forgot.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationRoutingModule,FormsModule,AuthSigninComponent,ResetPasswordComponent,ProfileComponent,ForgotComponent]
})
export class AuthenticationModule {}
