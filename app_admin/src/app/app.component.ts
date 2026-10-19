import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app_admin';

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  // End the session and navigate to the login page.
  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
