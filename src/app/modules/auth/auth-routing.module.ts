import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/auth/signup/signup.component';
import { OtpComponent } from './otp/otp.component';

const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
  },
  {
    path: 'register',
    component: SignupComponent,
    title: 'Signup Page',
  },
  {
    path: 'register/otp',
    component: OtpComponent,
    title: 'Confirmation Page',
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
