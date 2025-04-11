import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Projet } from '../demo/pages/Projet/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = 'http://localhost:8089/Projetback/api/projets'; // à adapter

 

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // stocké après login
    console.log('Token récupéré:', token); // Affiche le token dans la console pour vérifier son contenu
  
    if (!token || !token.includes('.')) {
      throw new Error('Token JWT malformé');
    }
  
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  
  getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.baseUrl, { headers: this.getHeaders() });
  }
  

  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
 

  updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.baseUrl}/${projet.idProjet}`, projet);
  }

  addProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.baseUrl, projet);
  }
}
