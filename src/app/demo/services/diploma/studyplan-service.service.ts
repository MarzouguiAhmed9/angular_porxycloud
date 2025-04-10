import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudyPlan } from 'src/app/models/study-plan.model';

@Injectable({
  providedIn: 'root'
})
export class StudyplanService {
  URL = 'http://localhost:8089/Projetback/api/study-plan';
  constructor(private http: HttpClient) {}
  getAllStudyPlan(): Observable<StudyPlan[]> {
    return this.http.get<StudyPlan[]>(`${this.URL}/getAll`);
  }
  deleteStudyPlan(id: any) {
    return this.http.delete<StudyPlan[]>(`${this.URL}/${id}`);
  }
  getStudyPlan(id: any) {
    return this.http.get<StudyPlan>(`${this.URL}/${id}`);
  }
  addStudyPlan(data: StudyPlan) {
    return this.http.post<StudyPlan[]>(`${this.URL}/add`, data);
  }
  updateStudyPlan(data: StudyPlan, id: any) {
    return this.http.put<StudyPlan>(`${this.URL}${id}/update`, data);
  }
}
