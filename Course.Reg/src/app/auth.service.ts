import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _jwt: string | null = null; // The JWT is private and only accessible via getter and setter

  constructor() {}

  // Getter for JWT
  get jwt(): string | null {
    return this._jwt || localStorage.getItem('jwt'); // Fallback to localStorage
  }

  // Setter for JWT
  set jwt(token: string | null) {
    this._jwt = token;
    if (token) {
      localStorage.setItem('jwt', token); // Store in localStorage
    } else {
      localStorage.removeItem('jwt'); // Remove from localStorage
    }
  }
}
