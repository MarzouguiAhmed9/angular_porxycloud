import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationModule } from './authentication-routing.module';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import AuthSigninComponent from './auth-signin/auth-signin.component';
import { AuthenticationRoutingModule } from "./authentication.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationRoutingModule,FormsModule,AuthSigninComponent]
})
export class AuthenticationModule {}
