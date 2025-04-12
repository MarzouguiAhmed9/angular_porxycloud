import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

import { Observable } from 'rxjs';
import { Projet } from '../demo/pages/Projet/projet';
import { Tache } from '../demo/pages/Projet/tache';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = 'http://localhost:8089/Projetback/api/projets'; // à adapter

  private apiUrl = 'http://localhost:8089/Projetback/api';

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
 
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken'); // Assurez-vous que le token est dans le localStorage
  }
  
  private getUserInfoFromToken(): any {
    const token = this.getAuthToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken; // Le decodedToken contiendra les informations du user (comme userId ou username)
    }
    return null;
  }
  
  addProjet(projet: Projet): Observable<Projet> {
    const token = this.getAuthToken();
    const headers = this.getHeaders();
    
    const userInfo = this.getUserInfoFromToken();
    if (userInfo) {
      projet.createurNom = userInfo.username || 'Nom inconnu'; // Assurez-vous que 'username' est une clé dans votre token
     
    }
    
    return this.http.post<Projet>(this.baseUrl, projet, { headers });
  }
  
  getTachesByProjet(id: number): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.baseUrl}/${id}/taches`, { headers: this.getHeaders() });
  }
  
  addTache(tache: Tache, idProjet: number): Observable<Tache> {
    return this.http.post<Tache>(`${this.baseUrl}/${idProjet}/taches`, tache, { headers: this.getHeaders() });
  }
  
  
 

  updateTache(tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/taches/${tache.idTache}`, tache, { headers: this.getHeaders() });
  }
  
  deleteTache(idTache: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/taches/${idTache}`, {
      headers: this.getHeaders(),
      responseType: 'text' // S'attendre à une réponse en texte brut
    });
  }
  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/projets/taches`, { headers: this.getHeaders() });
  }
  
    
}
