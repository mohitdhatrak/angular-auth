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
      if (control.hasError('doesPasswordMatch')) {
        return 'Password does not match!';
      }
      break;

    case 'mobileNumber':
      if (control.hasError('minlength')) {
        return 'Number has to be atleast 10 digits long!';
      } else if (control.hasError('pattern')) {
        return 'Mobile number is invalid!';
      }
      break;

    default:
      break;
  }

  return '';
}
