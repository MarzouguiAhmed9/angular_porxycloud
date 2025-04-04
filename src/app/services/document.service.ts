import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = '/Projetback/document';

  constructor(private http: HttpClient) { }

  addDocument(formData: FormData): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/add`, formData);
  }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/getall`);
  }

  getDocumentById(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/retrieve/${id}`);
  }

  updateDocument(document: Document): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/update`, document);
  }

  deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  addDocumentWithUser(document: Document, userId: number): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/addWithUser/${userId}`, document);
  }

  assignReviewToDocument(documentId: number, reviewId: number): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/affectReview/${documentId}/${reviewId}`, {});
  }

  assignCategoryToDocument(documentId: number, categoryId: number): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/affectCategory/${documentId}/${categoryId}`, {});
  }
}