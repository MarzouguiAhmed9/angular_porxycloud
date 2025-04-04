import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Category {
  idCategory: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // Using relative URL for the API request, as proxy configuration will handle the full path
  private apiUrl = '/Projetback/category';  // This will be proxied to http://localhost:8089

  constructor(private http: HttpClient) {}

  // Get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/getall`);
  }

  // Add a new category
  addCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/add`, category);
  }

  // Delete a category by ID
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Update an existing category
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/update`, category);
  }
}
