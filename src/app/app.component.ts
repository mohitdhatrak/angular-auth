import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './modules/shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-auth';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.setUser();
  }
}
