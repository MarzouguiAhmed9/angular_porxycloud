import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myEvent } from 'src/core/models/event';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8081/gestionEvent/Event';  

  constructor(private http: HttpClient) { }

  // Method to fetch events
  getEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/retriveAllEvents`)

  }
  deleteEvent(idEvent: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteEvent/${idEvent}`);
  }
  
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/addEvent`, event);
  }
  getEventById(idEvent: number): Observable<myEvent> {
    return this.http.get<myEvent>(`${this.apiUrl}/retriveEvent/${idEvent}`);
  }

  updateEvent(idEvent: number, event: myEvent): Observable<myEvent> {
    return this.http.put<myEvent>(`${this.apiUrl}/updateEvent/${idEvent}`, event);
  }
  uploadImage(event: any): void {
    const formData: FormData = new FormData();
    formData.append('image', event.target.files[0]);

    this.http.post<{message: string}>('http://localhost:8081/gestionEvent/Event/uploadImage', formData)
        .subscribe(
            (response) => {
                console.log('File uploaded successfully:', response.message);
            },
            (error) => {
                console.error('Error uploading image:', error);
            }
        );
}
addEventWithImage(eventData: any, file: File | null): Observable<Event> {
  const formData = new FormData();
  formData.append('event', JSON.stringify(eventData));
  
  if (file) {
      formData.append('file', file, file.name);
  }
  
  return this.http.post<Event>(`${this.apiUrl}/addEvent`, formData);
}
updateEventWithImage(idEvent: number, formData: FormData): Observable<myEvent> {
  return this.http.put<myEvent>(`${this.apiUrl}/updateEventWithImage/${idEvent}`, formData);
}
addEventWithImageAndSponsors(eventData: any, file: File | null, sponsorIds: number[]): Observable<Event> {
  const formData = new FormData();
  formData.append('event', JSON.stringify(eventData));
  
  if (file) {
    formData.append('file', file, file.name);
  }
  
  if (sponsorIds && sponsorIds.length > 0) {
    formData.append('sponsorIds', JSON.stringify(sponsorIds));
  }
  
  return this.http.post<Event>(`${this.apiUrl}/addEvent`, formData);
}
  

getEventsWithSponsors(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/retriveAllEventsWithSponsors`).pipe(
    map(events => events.map(event => ({
      ...event,
      sponsors: event.sponsors || [] // Garantit que sponsors existe toujours
    })))
  );
}
updateEventWithImageAndSponsors(
  idEvent: number, 
  formData: FormData,
  sponsorIds: number[]
): Observable<Event> {
  if (sponsorIds && sponsorIds.length > 0) {
    formData.append('sponsorIds', JSON.stringify(sponsorIds));
  }
  return this.http.put<Event>(`${this.apiUrl}/updateEventWithImageAndSponsors/${idEvent}`, formData);
}
getEventsForFront(): Observable<myEvent[]> {
  return this.http.get<myEvent[]>(`${this.apiUrl}/retriveAllEventsWithSponsors`);
}

getEventWithReviews(idEvent: number): Observable<myEvent> {
  return this.http.get<myEvent>(`${this.apiUrl}/retriveEventWithReviews/${idEvent}`).pipe(
    map(event => {
      // Initialiser reviews si null
      event.reviews = event.reviews || [];
      return event;
    }),
    catchError(error => {
      console.error('Error loading event with reviews:', error);
      throw error;
    })
  );
}
}