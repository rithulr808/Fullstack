import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust path if necessary

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.jwt) {
      return true; // Allow access if JWT is present
    } else {
      this.router.navigate(['/auth/sign-in']); // Redirect to login if JWT is missing
      return false;
    }
  }
}
