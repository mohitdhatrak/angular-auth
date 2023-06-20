import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/auth/signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent, OtpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [LoginComponent, SignupComponent],
  providers: [],
})
export class AuthModule {}
