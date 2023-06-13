import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authService: AuthService) {}

  getErrorMessage(text: string) {
    if (text === 'email') {
      if (this.loginForm.controls['email'].hasError('required')) {
        return 'You must enter a value';
      }
      return this.loginForm.controls['email'].hasError('email')
        ? 'Not a valid email'
        : '';
    } else {
      if (this.loginForm.controls['password'].hasError('required')) {
        return 'You must enter a value';
      }
      return this.loginForm.controls['password'].hasError('minlength')
        ? 'Not a valid password'
        : '';
    }
  }

  userLogin() {
    if (!this.loginForm.valid) {
      console.log('Data not valid!');
      return;
    }

    this.authService.login(this.loginForm);
  }
}
