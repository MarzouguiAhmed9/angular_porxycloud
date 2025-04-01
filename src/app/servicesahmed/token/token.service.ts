import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'token';

  constructor() {}

  /**
   * Set the token to localStorage
   * @param token The token to store
   */
  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);  // Store the token in localStorage
    } else {
      localStorage.removeItem(this.TOKEN_KEY);  // Remove the token from localStorage if it's null
    }
  }

  /**
   * Get the token from localStorage
   * @returns The token or null if not found
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);  // Return the token from localStorage
  }

  /**
   * Check if a token exists in localStorage
   * @returns True if the token exists, false otherwise
   */
  hasToken(): boolean {
    return !!this.getToken();  // Return true if the token exists, false otherwise
  }

  /**
   * Clear the token from localStorage
   */
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);  // Remove the token from localStorage
  }
}
