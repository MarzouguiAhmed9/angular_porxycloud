import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8081/gestionEvent/Reservation';

  constructor(private http: HttpClient) { }

  createReservation(eventId: number, seats: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}?eventId=${eventId}`, seats);
  }

  getReservationsForEvent(eventId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/event/${eventId}`);
  }
}
