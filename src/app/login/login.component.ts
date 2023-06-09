import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

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

    this.loginApiCall();
  }

  loginApiCall() {
    const loginData = this.loginForm.value;
    const finalData = {
      userLogin: loginData.email,
      password: loginData.password,
      tenantLogin: 'world',
    };
    console.log(finalData);

    this.http
      .post(
        'https://dev.platformcommons.org/gateway/commons-iam-service/api/v1/obo/cross/login?crossTenant=uandi',
        finalData
      )
      .subscribe({
        next: (value: any) => {
          if (value.sessionId) {
            console.log(value);
            localStorage.setItem('sessionId', value.sessionId);
            localStorage.setItem('crossSessionId', value.crossSessionId);
            this.router.navigate(['/']);
          }
        },
        error: (e) => {
          console.log(e?.error?.errorMessage);
        },
      });
  }
}
