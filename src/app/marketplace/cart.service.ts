import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/paniers';
  private cartSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getOrCreateCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mon-panier`);
  }

  addToCart(itemId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/items/${itemId}`, {});
  }

  removeFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${itemId}`);
  }

  getCartTotal(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`);
  }
}