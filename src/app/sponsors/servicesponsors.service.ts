import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from 'src/core/Sponsor';

@Injectable({
  providedIn: 'root'
})
export class ServicesponsorsService {
  private apiUrl = 'http://localhost:8081/gestionEvent/Sponsor';

  constructor(private http: HttpClient) { }

  addSponsor(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.post<Sponsor>(`${this.apiUrl}/addSponsor`, sponsor);
  }

 
  updateSponsor(id: number, formData: FormData): Observable<Sponsor> {
    return this.http.put<Sponsor>(
      `${this.apiUrl}/updateSponsor/${id}`, 
      formData,
      {
        headers: { 'Accept': 'application/json' }
      }
    );
  }
  deleteSponsor(idSponsor: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteSponsor/${idSponsor}`);
  }

  getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(`${this.apiUrl}/retriveAllSponsors`);
  }

  getSponsorById(id: number): Observable<Sponsor> {
    return this.http.get<Sponsor>(`${this.apiUrl}/retriveSponsor/${id}`);
  }

  uploadLogo(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post(`${this.apiUrl}/uploadLogo`, formData, { 
      responseType: 'text' 
    });
  }

}
