import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { validateForm } from '../validate-form';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide1: boolean = true;
  hide2: boolean = true;

  regexEmail: RegExp = /^[w#!%$'&+*-/?^`.{|}~=]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  regexPassword: RegExp =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=S+$).*$/;
  // regexPhone: string = '/^(0|+?91 ?)?[6-9][0-9]{4} ?[0-9]{5}$/';

  doesPasswordMatch(control: FormControl): { [key: string]: boolean } | null {
    const password = control.root.get('password');
    const confirmPassword = control.value;

    if (password && confirmPassword && password.value !== confirmPassword) {
      return { doesPasswordMatch: true }; // Return error object if passwords don't match
    }

    return null; // Return null if passwords match
  }

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      // Validators.pattern(this.regexPassword),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.doesPasswordMatch,
    ]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      // Validators.pattern(this.regexPhone),
    ]),
    dob: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  getErrorMessage(control: AbstractControl, input: string): string {
    return validateForm(control, input);
  }

  userRegister(): void {
    if (this.signupForm.invalid) {
      console.log('Data not valid!');
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next: (value: any) => {
        if (value.sessionId) {
          console.log(value);
          // this.router.navigate(['/auth/register/otp']);
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
