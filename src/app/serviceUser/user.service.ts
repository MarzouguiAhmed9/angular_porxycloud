import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  dateNaissance: string;
  address: string;
  phone: string;
  approved: boolean;
}

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
      case 'ROLE_CLIENT':
        this.router.navigate(['/user/home']);
        break;
      default:
        this.router.navigate(['/auth/signin']); // Par défaut, rediriger vers la page de connexion
    }
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return null;
    }

    const decodedToken = this.decodeToken(token);
    return decodedToken?.role || null; // 🔴 Erreur ici
}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

 



  decodeToken(token: string): any {
      // Utilise une bibliothèque comme jwt-decode pour décoder le JWT
      return jwtDecode(token); // Exemple avec jwt-decode
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
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  
  getRoles(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/roles`).pipe(
      catchError(error => {
        console.error('❌ Erreur lors de la récupération des rôles', error);
        return throwError('Impossible de récupérer les rôles.');
      })
    );
  }
  // 📌 Récupération des rôles de l'utilisateur connecté
  getUserRoles(): Observable<string> {
    const token = this.getToken();
    if (!token) {
      return throwError('Utilisateur non authentifié.');
    }

    // Extraire l'ID de l'utilisateur du token
    const decodedToken = this.decodeToken(token);
    const userId = decodedToken?.id;

    if (!userId) {
      return throwError('Utilisateur non trouvé.');
    }

    // Appeler le backend pour obtenir le rôle de l'utilisateur
    return this.http.get<string>(`${this.baseUrl}/users/${userId}/roles`).pipe(
      catchError(error => {
        console.error('❌ Erreur lors de la récupération des rôles', error);
        return throwError('Impossible de récupérer le rôle.');
      })
    );
  }
  getUserDetails(): any {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      console.log('Payload décodé:', payload); // Afficher le contenu du token
      return payload ? payload.user : null;
    }
    return null;
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const params = {
      resetToken: token,
      newPassword: newPassword
    };
  
    return this.http.post(`${this.baseUrl}/reset-password`, null, {
      params
    });
  }

 





  // 🔹 URL de base pour les actions utilisateurs
private userApiUrl = 'http://localhost:8089/Projetback/api/users'; // adapte selon ton backend

// 🔸 Récupérer tous les utilisateurs
getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.userApiUrl}`);
}

// 🔸 Supprimer un utilisateur
deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.userApiUrl}/${id}`);
}

// 🔸 Mettre à jour un utilisateur
updateUser(id: number, userData: any): Observable<any> {
  return this.http.put<any>(`${this.userApiUrl}/${id}`, userData);
}

// 🔸 Changer le statut (approve / unapprove)
toggleApproval(id: number): Observable<any> {
  return this.http.put(`${this.userApiUrl}/${id}/toggle-approval`, {});
}

  
  
}
