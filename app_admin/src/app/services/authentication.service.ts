import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { User, AuthResponse, AuthUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly tokenKey = 'travlr-token';
  private readonly loginUrl = '/api/login';

  constructor(private http: HttpClient) {}

  // Submit credentials to the Express authentication endpoint.
  // Save the JWT only after the server confirms successful login.
  public login(credentials: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, credentials).pipe(
      tap((response) => {
        this.saveToken(response.token);
      })
    );
  }

  // Store the JWT so the session survives page refreshes.
  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve the stored token for authenticated API requests.
  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Decode the JWT payload to obtain user details.
  // This is for displaying session information, not verifying security.
  public getCurrentUser(): AuthUser | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];

      if (!payload) {
        return null;
      }

      // Convert Base64URL encoding to standard Base64.
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = atob(base64);

      return JSON.parse(decoded) as AuthUser;
    } catch {
      return null;
    }
  }

  // Check whether a token exists and has not expired.
  // The Express server independently verifies the JWT signature.
  public isLoggedIn(): boolean {
    const user = this.getCurrentUser();

    return user !== null && user.exp > Math.floor(Date.now() / 1000);
  }

  // Remove the stored JWT to end the local session.
  public logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
