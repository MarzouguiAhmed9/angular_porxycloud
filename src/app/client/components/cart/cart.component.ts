import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../marketplace/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getOrCreateCart().subscribe(cart => {
      this.cart = cart;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.cartService.getCartTotal().subscribe(total => {
      this.total = total;
    });
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe(() => {
      this.loadCart();
    });
  }

  checkout(): void {
    // Implémentez la logique de paiement ici
    alert('Checkout functionality to be implemented');
  }
}