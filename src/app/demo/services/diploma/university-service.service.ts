import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { University } from 'src/app/models/university.model';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  URL = 'http://localhost:8089/Projetback/api/university';
  constructor(private http: HttpClient) {}
  getAllUniversities(): Observable<University[]> {
    return this.http.get<University[]>(`${this.URL}/getAll`);
  }
  getUniversity(id: any) {
    return this.http.get<University>(`${this.URL}/${id}`);
  }
  deleteUniversity(id: any) {
    return this.http.delete<University[]>(`${this.URL}/${id}`);
  }
  addUniversity(data: University) {
    return this.http.post<University[]>(`${this.URL}/add`, data);
  }
  updateUniversity(data: University, id: any) {
    return this.http.put<University>(`${this.URL}/update`, data);
  }
}
