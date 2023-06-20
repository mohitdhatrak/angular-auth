import { AbstractControl } from '@angular/forms';

export function validateForm(control: AbstractControl, input: string): string {
  if (control.hasError('required')) {
    return 'This is a required field!';
  }

  switch (input) {
    case 'email':
      if (control.hasError('email')) {
        return 'Email is invalid!';
      }
      break;

    case 'password':
      if (control.hasError('minlength')) {
        return 'Password has to be atleast 8 characters long!';
      } else if (control.hasError('pattern')) {
        return 'Password must contain atleast 1 special character, 1 numeric value and 1 uppercase & lowercase letter each!';
      }
      break;

    case 'confirmPassword':
      if (control.hasError('passwordNotMatching')) {
        return 'Password does not match!';
      }
      break;

    case 'firstName' || 'lastName':
      if (control.hasError('pattern')) {
        return 'Name can only consist of alphabets, no white spaces!';
      }
      break;

    case 'mobileNumber':
      if (control.hasError('pattern')) {
        return 'Mobile number is invalid!';
      }
      break;

    case 'otp':
      if (control.hasError('pattern')) {
        return 'OTP contains digits only, no spaces!';
      } else if (
        control.hasError('minlength') ||
        control.hasError('maxlength')
      ) {
        return 'OTP must have 6 digits!';
      }
      break;

    default:
      break;
  }

  return '';
}
