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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  regexOtp: RegExp = /^[0-9]+$/;

  otp: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern(this.regexOtp),
  ]);

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getErrorMessage(control: AbstractControl, input: string): string {
    return validateForm(control, input);
  }

  checkOtp(): void {
    if (this.otp.invalid) {
      this.snackBar.open('Enter OTP correctly!', 'Close');
      return;
    }

    this.authService.checkOtp(this.otp.value).subscribe({
      next: (response: any) => {
        if (response === 'User has been activated successfully') {
          this.snackBar.open('User verified successfully!', 'Close');
          this.logUserIn();
        }
      },
      error: (e: any) => {
        // getting response as text, as on success response is text
        // so here we need to parse the string to get JSON
        if (JSON.parse(e?.error)?.errorMessage === 'Invalid OTP') {
          this.snackBar.open('Incorrect OTP!', 'Close');
        }
      },
    });
  }

  // this is giving error, that user email is not valid, even after successful register
  // i checked, the emails i register with my signup, don't work in login
  // but the ones i create using main website work, no invalid login error
  logUserIn() {
    this.authService.loginNewUser().subscribe({
      next: (value: any) => {
        if (value.sessionId) {
          localStorage.setItem('sessionId', value.sessionId);
          localStorage.setItem('crossSessionId', value.crossSessionId);
          this.authService.currentUser$.next(true); // navigate works after updating this
          this.authService.newUserData = {};
          this.authService.newUserPassword = '';
          this.router.navigate(['/main']);
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
