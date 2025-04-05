// user-profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private apiUrl = 'http://localhost:8089/api/user/profile';  // L'URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer le profil utilisateur
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('authToken');  // Supposons que le token JWT est stocké dans localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.apiUrl, { headers });
  }
}

