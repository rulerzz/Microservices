import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AuthRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [LoginComponent, SignupComponent],
})
export class AuthModule {}
