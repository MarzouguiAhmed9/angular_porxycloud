import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { UserService } from '../serviceUser/user.service';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:8089/Projetback/api/items';

  constructor(private http: HttpClient ,  private userService: UserService) {}
  
  // Pour les admins
  getPendingItems(): Observable<any[]> {
    const token = localStorage.getItem('authToken'); // ou votre méthode de stockage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any[]>(`${this.apiUrl}/pending`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching pending items', error);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  approveItem(id: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${id}/approve`, 
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(() => console.log(`Item ${id} approved`)),
      catchError(error => {
        console.error(`Error approving item ${id}`, error);
        throw error;
      })
    );
  }


  rejectItem(id: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${id}/reject`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(() => console.log(`Item ${id} rejected`)),
      catchError(error => {
        console.error(`Error rejecting item ${id}`, error);
        throw error;
      })
    );
  }
  // Pour les clients
  
  getMyItems(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seller/${userId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error fetching user items', error);
        return of([]);
      })
    );
  }


  createItem(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.userService.getToken()}`
    });

    return this.http.post(`${this.apiUrl}`, formData, { 
        headers,
        observe: 'response' // Get full response including status
    }).pipe(
        map(response => response.body),
        catchError(error => {
            if (error.error instanceof Blob) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        try {
                            const err = JSON.parse(reader.result as string);
                            reject(err);
                        } catch (e) {
                            reject({ message: 'File upload failed' });
                        }
                    };
                    reader.readAsText(error.error);
                });
            }
            return throwError(() => ({
                message: error.error?.message || 'Validation failed',
                details: error.error
            }));
        })
    );
}
getImageUrl(imagePath: string): string {
  return `${this.apiUrl}/uploads/${imagePath}`;
}
  private parseBackendErrors(error: any): string {
    if (error?.errors) {
      return error.errors.join('\n');
    }
    if (error?.message) {
      return error.message;
    }
    return 'Validation failed - check your input and file requirements';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // or your token storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: any) {
    let errorMessage = 'Validation error: Please check your input';
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status === 403) {
      errorMessage = 'You are not authorized to perform this action';
    }
    return throwError(() => new Error(errorMessage));
  }

  updateItem(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData, {
        headers: this.getAuthHeaders()
    }).pipe(
        catchError(this.handleError)
    );
}

deleteItem(id: number): Observable<any> {
  console.log(`Sending delete request for item ${id}`); // Log de débogage
  
  return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
      observe: 'response' // Pour voir la réponse complète
  }).pipe(
      tap(response => {
          console.log('Delete response:', response);
          if (response.status === 204) {
              console.log('Item deleted successfully');
          }
      }),
      map(response => response.body),
      catchError(error => {
          console.error('Detailed delete error:', error);
          return throwError(() => ({
              message: error.error?.message || 'Delete failed',
              status: error.status,
              details: error.error
          }));
      })
  );
}
  getItemById(id: number): Observable<any> {
    // Mock implementation, replace with actual API call
    return of({
      id,
      title: 'Sample Item',
      description: 'This is a sample item description.',
      price: 100,
      category: 'Sample Category'
    });
  }
}