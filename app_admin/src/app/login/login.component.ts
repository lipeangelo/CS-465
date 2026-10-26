import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Credentials bound to the login form.
  credentials: User = {
    email: '',
    password: ''
  };

  // Display authentication errors to the user.
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  // Submit the credentials to the Express login endpoint.
  onLogin(): void {
    if (this.isSubmitting) {
      return;
    }

    this.errorMessage = '';
    this.isSubmitting = true;

    this.authenticationService.login(this.credentials).subscribe({
      next: () => {
        // Redirect to the admin dashboard after successful login.
        this.isSubmitting = false;
        this.router.navigate(['/']);
      },
      error: () => {
        // Avoid revealing whether an email address exists.
        this.errorMessage = 'Invalid email or password. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}
