import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

import { catchError, Observable, throwError } from 'rxjs';
import { Projet } from '../demo/pages/Projet/projet';
import { Tache } from '../demo/pages/Projet/tache';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = 'http://localhost:8089/Projetback/api/projets'; // à adapter

  private apiUrl = 'http://localhost:8089/Projetback/api';

  constructor(private http: HttpClient) {}
  private TOKEN_KEY = 'authToken'; // Constante pour clé du token
  
  

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.TOKEN_KEY); // Utilisez la même clé partout
    console.log('Token récupéré:', token);
  
    if (!token || !token.includes('.')) {
      throw new Error('Token JWT malformé');
    }
  
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  ajouterProjet(formData: FormData): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY); // Récupérer le token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post(`${this.baseUrl}/add`, formData, { headers });
  }

  // Exemple de gestion des erreurs
  handleError(error: any): Observable<never> {
    // Logique pour gérer les erreurs, par exemple rediriger vers la page de login si non autorisé
    console.error('Erreur:', error);
    throw error; // ou gérer en affichant un message utilisateur
  }
 
 
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
  
  getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.baseUrl}/all`, { headers: this.getHeaders() });
  }
  
  
  

  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.getHeaders() });
  }
  
  updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.baseUrl}/update/${projet.idProjet}`, projet, { headers: this.getHeaders() });
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
  
  getTachesByProjet(idProjet: number): Observable<any> {
    return this.http.get(`http://localhost:8089/Projetback/api/projets/${idProjet}/taches`);
  }
  
  

  
  
 

  updateTache(tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.baseUrl}/taches/${tache.idTache}/update`, tache, { headers: this.getHeaders() });
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
  
  deleteTask(idProjet: number, idTache: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8089/Projetback/api/projets/${idProjet}/tache/${idTache}`);
  }
  
  

  addProjets(projet: Projet): Observable<Projet> {
    const token = this.getAuthToken();
    const headers = this.getHeaders();
  
    const userInfo = this.getUserInfoFromToken();
    if (userInfo) {
      projet.createurNom = userInfo.username || 'Nom inconnu'; // Assurez-vous que 'username' est une clé dans votre token
    }
    
    return this.http.post<Projet>(this.baseUrl, projet, { headers });
  }
  
  addTache(newTask: Tache, projetId: number, userId: number, headers: any): Observable<Tache> {
    return this.http.post<Tache>(`http://localhost:8089/Projetback/api/projets/${projetId}/tache/${userId}/add`, newTask, { headers })
      .pipe(
        catchError(error => {
          console.error('Erreur lors de l\'ajout de la tâche', error);
          return throwError(() => new Error('Erreur serveur lors de l\'ajout de la tâche'));
        })
      );
  }
  

  getProjectDurationInDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }  
  
  participate(projetId: number, userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`  // Assumes token is saved in localStorage
    });
    
    const url = `${this.apiUrl}/projets/projets/${projetId}/participate/${userId}`;
    return this.http.post(url, {}, { headers });
  }
  
  



  
  
}
