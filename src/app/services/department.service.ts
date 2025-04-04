import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Department {
  idDepartment: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = '/Projetback/department';

  constructor(private http: HttpClient) {}

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/getall`);
  }

  addDepartment(dep: Partial<Department>): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/add`, dep);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  updateDepartment(dep: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/update`, dep);
  }
}
