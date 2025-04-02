import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8089/Projetback/api/auth';  // Correction ici

 
    
  
    constructor(private http: HttpClient, private router: Router) {}
    login(credentials: { username: string; password: string }): Observable<any> {
      return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
        tap((response: any) => {
          if (response.token) {
            this.storeToken(response.token);
            const role = this.getUserRole();
            this.redirectUser(role);
          }
        }),
        catchError(error => {
          console.error('❌ Erreur de connexion', error);
          return throwError(error);
        })
      );
    }
    redirectUser(role: string | null): void {
      if (!role) {
        this.router.navigate(['/auth/signin']); // Redirection par défaut si aucun rôle trouvé
        return;
      }
    
      switch (role) {
        case 'ROLE_ADMIN':
          this.router.navigate(['/admin/dashboard']);
          break;
        case 'ROLE_USER':
          this.router.navigate(['/user/home']);
          break;
        default:
          this.router.navigate(['/auth/signin']); // Par défaut, rediriger vers la page de connexion
      }
    }

   getUserRole(): string | null {
      const token = this.getToken();
      if (!token) return null;
    
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le token
        const roles = payload.roles || [];
        return roles.length > 0 ? roles[1] : null; // Retourner le premier rôle trouvé
      } catch (error) {
        console.error('❌ Erreur lors du décodage du token', error);
        return null;
      }
    }
    
    
    
    
  
    register(user: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/register`, user);
    }
  
   
    storeToken(token: string): void {
      localStorage.setItem('authToken', token);
    }
  
    // 📌 Récupération du token
    getToken(): string | null {
      return localStorage.getItem('authToken');
    }
  
    // 🔓 Déconnexion utilisateur
    logout(): void {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    }
  
    // 📌 Récupération des rôles de l'utilisateur connecté
    getUserRoles(): string[] {
      const token = this.getToken();
      if (!token) return [];
  
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.roles || [];
      } catch (error) {
        console.error('❌ Erreur lors du décodage du token', error);
        return [];
      }
    }
  
    getRoles(userId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/roles`).pipe(
        catchError(error => {
          console.error('❌ Erreur lors de la récupération des rôles', error);
          return throwError('Impossible de récupérer les rôles.');
        })
      );
    }


    // 🏢 Récupération des applications liées à un utilisateur
  // 🏢 Récupération des applications liées à un utilisateur
/*getApplications(userId: number): Observable<any> {
  const token = this.getToken();
  if (!token) {
    console.error('❌ Aucun token trouvé');
    return throwError('Utilisateur non authentifié.');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.get(`${this.baseUrl}/application/getall`, { headers }).pipe(
    catchError(error => {
      console.error('❌ Erreur lors de la récupération des applications', error);
      return throwError('Impossible de récupérer les applications.');
    })
  );
}*/

  }    