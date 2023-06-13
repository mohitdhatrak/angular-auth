import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  setUser() {
    if (localStorage.getItem('sessionId')) {
      this.currentUser$.next(true);
      // return true;
    } else {
      this.currentUser$.next(false);
      // return false;
    }
  }

  isAuthenticated() {
    if (this.currentUser$.getValue()) {
      return true;
    }
    return false;
  }

  login(loginForm: any) {
    const loginData = loginForm.value;
    const finalData = {
      userLogin: loginData.email,
      password: loginData.password,
      tenantLogin: 'world',
    };
    console.log(finalData);

    this.http
      .post(
        'https://dev.platformcommons.org/gateway/commons-iam-service/api/v1/obo/cross/login?crossTenant=uandi',
        finalData
      )
      .subscribe({
        next: (value: any) => {
          if (value.sessionId) {
            console.log(value);
            localStorage.setItem('sessionId', value.sessionId);
            localStorage.setItem('crossSessionId', value.crossSessionId);
            this.router.navigate(['/main/home']);
          }
        },
        error: (e) => {
          console.log(e?.error?.errorMessage);
        },
      });
  }

  logout() {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('crossSessionId');
    this.currentUser$.next(false);
    this.router.navigate(['/auth/login']);
  }

  register() {}
}
