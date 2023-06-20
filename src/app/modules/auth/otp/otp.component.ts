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

  constructor(private authService: AuthService, private router: Router) {}

  getErrorMessage(control: AbstractControl, input: string): string {
    return validateForm(control, input);
  }

  checkOtp(): void {
    if (this.otp.invalid) {
      console.log('Otp not valid!');
      return;
    }

    this.authService.checkOtp(this.otp.value).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response);
          this.router.navigate(['/main']);
        }
      },
      error: (e: any) => {
        // getting response as text, as on success response is text
        // so here we need to parse the string to get JSON
        console.log(JSON.parse(e?.error)?.errorMessage);
      },
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/main']);
    }
  }
}
