import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { validateForm } from '../validate-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  regexEmail: RegExp =
    /^[\w#!%\$'&\+\*-/\?\^`\.\{\|\}~=]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/;
  regexPassword: RegExp =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=\S+$).*$/;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.regexPassword),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  getErrorMessage(control: AbstractControl, input: string): string {
    return validateForm(control, input);
  }

  userLogin(): void {
    if (this.loginForm.invalid) {
      console.log('Data not valid!');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (value: any) => {
        if (value.sessionId) {
          localStorage.setItem('sessionId', value.sessionId);
          localStorage.setItem('crossSessionId', value.crossSessionId);
          this.authService.currentUser$.next(true); // navigate works after updating this
          this.router.navigate(['/main']);
        }
      },
      error: (e: any) => {
        console.log(e?.error?.errorMessage);
      },
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/main']);
    }
  }
}
