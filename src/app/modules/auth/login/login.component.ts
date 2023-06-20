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
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getErrorMessage(control: AbstractControl, input: string): string {
    return validateForm(control, input);
  }

  userLogin(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Form incomplete or incorrect!', 'Close');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (value: any) => {
        if (value.sessionId) {
          localStorage.setItem('sessionId', value.sessionId);
          localStorage.setItem('crossSessionId', value.crossSessionId);
          this.authService.currentUser$.next(true); // navigate works after updating this
          this.snackBar.open('Login successful', 'Close');
          this.router.navigate(['/main']);
        }
      },
      error: (e: any) => {
        if (e?.error?.errorCode === 'ERR_PLATFORM_GEN_UNAUTHENTICATED') {
          this.snackBar.open('Invalid credentials!', 'Close');
        }
      },
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/main']);
    }
  }
}
