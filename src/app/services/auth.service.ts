import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginForm, SignupForm } from '../modules/auth/AuthForm';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  setUser(): void {
    if (localStorage.getItem('sessionId')) {
      this.currentUser$.next(true);
    } else {
      this.currentUser$.next(false);
    }
  }

  isAuthenticated(): boolean {
    if (this.currentUser$.getValue()) {
      return true;
    }
    return false;
  }

  login(loginData: any): Observable<any> {
    const finalData: LoginForm = {
      userLogin: loginData.email,
      password: loginData.password,
      tenantLogin: 'world',
    };
    console.log(finalData);

    return this.http.post(
      'https://dev.platformcommons.org/gateway/commons-iam-service/api/v1/obo/cross/login?crossTenant=uandi',
      finalData
    );
  }

  logout(): void {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('crossSessionId');
    this.currentUser$.next(false);
    this.router.navigate(['/auth/login']);
  }

  register(signupData: any): Observable<any> {
    const finalData: SignupForm = {
      id: 0,
      dob: signupData.dob,
      appContext: 'uandi.commons.social',
      firstName: signupData.firstName,
      lastName: signupData?.lastName,
      login: signupData.email,
      userContacts: [
        {
          contact: {
            contactType: { dataCode: 'CONTACT_TYPE.MOBILE' },
            contactValue: signupData.mobileNumber,
            id: 0,
            verified: true,
            notes: 'India',
          },
          id: 0,
          primaryContact: true,
        },
        {
          contact: {
            contactType: { dataCode: 'CONTACT_TYPE.MAIL' },
            contactValue: signupData.email,
            id: 0,
            verified: true,
            notes: null,
          },
          id: 0,
          primaryContact: true,
        },
      ],
    };
    console.log(finalData);

    return this.http.post(
      'https://dev.platformcommons.org/gateway/commons-iam-service/api/v1/obo/register?tenantName=world',
      finalData
    );
  }
}
