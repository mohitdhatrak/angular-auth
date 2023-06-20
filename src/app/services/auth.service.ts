import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginForm, SignupForm } from '../modules/auth/AuthForm';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = 'https://dev.platformcommons.org/gateway';
  token: string | null = localStorage.getItem('sessionId');
  newUserData: any = {
    id: 0,
    responseDTO: { modeKey: '' },
    login: '',
  };
  newUserPassword: string = '';

  currentUser$ = new BehaviorSubject<boolean>(false); // read: vs Subject difference
  constructor(private http: HttpClient, private router: Router) {}

  setUser(): void {
    if (this.token) {
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

    const params = new HttpParams().set('crossTenant', 'uandi');

    return this.http.post(
      `${this.baseURL}/commons-iam-service/api/v1/obo/cross/login`,
      finalData,
      { params }
    );
  }

  logout(): void {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('crossSessionId');
    this.currentUser$.next(false);
    this.router.navigate(['/auth']);
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

    this.newUserPassword = signupData.password;

    const params = new HttpParams().set('tenantName', 'world');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-PASS', `Bearer ${this.token}`);
    // doubt: what to pass in X-PASS? How is token relevant in register?

    return this.http.post(
      `${this.baseURL}/commons-iam-service/api/v1/obo/register`,
      finalData,
      { params, headers }
    );
  }

  checkOtp(otp: any): Observable<any> {
    const params = new HttpParams().set('userId', this.newUserData?.id); // number

    const headers = new HttpHeaders()
      .set('modKey', this.newUserData?.responseDTO.modKey)
      .set('otp', otp) // string
      .set('tenantName', 'world');

    return this.http.post(
      `${this.baseURL}/commons-iam-service/api/v1/obo/activate-user`,
      {},
      { params, headers, responseType: 'text' }
    );
  }

  loginNewUser(): Observable<any> {
    const finalData: LoginForm = {
      userLogin: this.newUserData?.login,
      password: this.newUserPassword,
      tenantLogin: 'world',
    };

    const params = new HttpParams().set('crossTenant', 'uandi');

    return this.http.post(
      `${this.baseURL}/commons-iam-service/api/v1/obo/cross/login`,
      finalData,
      { params }
    );
  }
}
