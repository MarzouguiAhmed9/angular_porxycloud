import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8089/Projetback/api/auth';  // Correction ici

 
    
  
    constructor(private http: HttpClient, private router: Router) {}
  
    login(credentials: { username: string, password: string }) {
      return this.http.post<any>(`${this.baseUrl}/login`, credentials, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true  // Si tu utilises des cookies ou des sessions
      }).pipe(
        catchError(error => {
          // Gérer l'erreur et l'afficher dans la console
          console.error('Login failed', error);
          
          // Retourne une erreur personnalisée ou rejette l'erreur
          let errorMessage = 'An unknown error occurred.';
          if (error.status === 0) {
            errorMessage = 'Server not reachable. Please try again later.';
          } else if (error.status === 401) {
            errorMessage = 'Invalid credentials. Please check your username and password.';
          }
          
          // Retourner l'erreur sous forme de message lisible
          return throwError(errorMessage);
        })
      );
    }
    
    
    
  
    register(user: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/register`, user);
    }
  
    storeToken(token: string): void {
      localStorage.setItem('authToken', token);
    }
  
    getToken(): string | null {
      return localStorage.getItem('authToken');
    }
  
    logout(): void {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    }
    getRoles(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/users/roles`);
    }

    getApplications() {
      const token = localStorage.getItem('auth_token');  // Or wherever you store the token
    
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get('http://localhost:8089/Projetback/application/getall', { headers })
        .subscribe(
          (response) => {
            console.log('Applications fetched:', response);
          },
          (error) => {
            console.error('Error fetching applications:', error);
          }
        );   }
   
  }