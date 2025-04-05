import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/core/models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8081/gestionEvent/Review';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(
      `${this.apiUrl}/addReview`, 
      review,
      this.httpOptions
    );
  }

  getReviewsByEvent(idEvent: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/byEvent/${idEvent}`);
  }
}
