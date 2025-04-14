import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Role } from './role/Role';
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  phone: string;
  approuve: boolean;
  email: string;  // Ajout de la propriété email
  enabled: boolean;
  role: {
    id: number;
    name: string;
    authority: string;
  };
  username: string;
  password: string;
  
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
        this.router.navigate(['/client/dashborad']);
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
    return decodedToken?.role 
    || decodedToken?.authorities?.[0] 
    || decodedToken?.roles?.[0] 
    || null; // 🔴 Erreur ici
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
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    try {
      const payload = this.decodeToken(token);
      const now = Date.now() / 1000;
      
      if (payload.exp < now) {
        console.log('Token expired at:', new Date(payload.exp * 1000));
        return false;
      }
      
      // Vérification supplémentaire du rôle
      if (payload.role !== 'ROLE_CLIENT') {
        console.log('User role not authorized:', payload.role);
        return false;
      }
      
      return true;
    } catch (e) {
      console.error('Invalid token:', e);
      return false;
    }
  }
  // 🔓 Déconnexion utilisateur
  logout(): void {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  getRoles(userId: number): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/api/auth/users/${userId}/roles`).pipe(
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
      console.log('Decoded token payload:', payload);
      return {
        id: payload.id,
        firstName: payload.firstName || '', // Ajoutez ces champs si disponibles
        lastName: payload.lastName || '',
        email: payload.email || '',
        username: payload.username,
        role: payload.role
      };
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

  getUserStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistics`);
  }





  // 🔹 URL de base pour les actions utilisateurs
private userApiUrl = 'http://localhost:8089/Projetback/api/auth'; // adapte selon ton backend




// Ajouter dans le service Angular
getAllUsers(headers: HttpHeaders): Observable<User[]> {
  return this.http.get<User[]>(`${this.userApiUrl}/users`, { headers });
}
addUser(user: User, headers: HttpHeaders): Observable<User> {
  return this.http.post<User>(`${this.userApiUrl}/users/add`, user, { headers });
}

deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.userApiUrl}/users/${id}`);
}

 updateUser(id: number, user: User, headers: HttpHeaders): Observable<User> {
  return this.http.put<User>(`${this.userApiUrl}/users/${id}`, user, { headers });
}

toggleApproval(id: number): Observable<any> {
  return this.http.put(`${this.userApiUrl}/users/${id}/toggle-approval`, {});
}


  
  
}