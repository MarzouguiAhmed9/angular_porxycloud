// user-profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private apiUrl = 'http://localhost:8089/Projetback/api/auth';  // L'URL de votre API

  constructor(private http: HttpClient) {}



  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getUserProfile(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  

  
}

