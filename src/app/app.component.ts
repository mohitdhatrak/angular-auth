import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-auth';

  currentURL = '';

  constructor(private router: Router, private location: Location) {}

  handleButtonClick(route: any) {
    this.router.navigate([route]);
  }

  logUserOut() {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('crossSessionId');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateNavbar();
      });
  }

  updateNavbar(): void {
    this.currentURL = this.router.url;
  }
}
