import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from 'src/app/models/cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  UrlCours="http://localhost:8089/Projetback"
  constructor(private http:HttpClient) { }

  getallCours():Observable<any>{
    return this.http.get<any>(`${this.UrlCours}/cours/getAllCours`)
  }
  addCours(formData: FormData): Observable<any>{
    return this.http.post<any>(`${this.UrlCours}/cours/addCours`, formData);
  }

  deleteCours(idcours:any):Observable<any>{
    return this.http.delete<any>(`${this.UrlCours}/cours/deleteCours/${idcours}`)
  }
  affectTestToCours(idcours:any,idtest:any):Observable<any>{
    return this.http.put<any>(`${this.UrlCours}/cours/affectTestToCours/${idcours}/${idtest}`,null)
  }
  affectCertificatToCours(idcours:any,idtcert:any):Observable<any>{
    return this.http.put<any>(`${this.UrlCours}/cours/affectCertificatToCours/${idcours}/${idtcert}`,null)
  }

  getCours(idcours:any):Observable<Cours>{
    return this.http.get<Cours>(`${this.UrlCours}/cours/getCoursById/${idcours}`)
  }

  updateCours(formData: FormData): Observable<any>{
    return this.http.post<any>(`${this.UrlCours}/cours/updateCours`, formData);
  }
}
