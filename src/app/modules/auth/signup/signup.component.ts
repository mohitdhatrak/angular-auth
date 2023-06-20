import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
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

  regexEmail: RegExp =
    /^[\w#!%\$'&\+\*-/\?\^`\.\{\|\}~=]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/;
  regexPassword: RegExp =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=\S+$).*$/;
  regexPhone: RegExp = /^(0|\+?91 ?)?[6-9][0-9]{4} ?[0-9]{5}$/;
  regexName: RegExp = /^[A-Za-z]+$/;

  // custom validator function
  doesPasswordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('password')?.value;
    const confirmPassword = control.value;

    if (password && confirmPassword && password !== confirmPassword) {
      // Return a validation error object if the condition fails
      return { passwordNotMatching: true };
    }

    return null; // Return null if validation passes
  }

  // read: inline regex validation
  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regexName),
    ]),
    lastName: new FormControl('', Validators.pattern(this.regexName)),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.regexPassword),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.doesPasswordMatch,
    ]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regexPhone),
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
        if (value.id) {
          // value.id is param to otp
          // value.responseDTO.modeKey is header
          this.authService.newUserData = { ...value };
          this.router.navigate(['/auth/register/otp']);
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
