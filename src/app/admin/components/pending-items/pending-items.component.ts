import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../marketplace/item.service';
import { CommonModule, CurrencyPipe } from '@angular/common'; // Ajout de CurrencyPipe

@Component({
  selector: 'app-pending-items',
  standalone: true,
  imports: [CommonModule], // CommonModule fournit *ngIf et *ngFor
  providers: [CurrencyPipe], // Ajout du pipe currency
  templateUrl: './pending-items.component.html',
  styleUrls: ['./pending-items.component.scss']
})
export class PendingItemsComponent implements OnInit {
  pendingItems: any[] = [];

  constructor(
    private itemService: ItemService,
    private currencyPipe: CurrencyPipe // Injection du pipe
  ) {}

  ngOnInit(): void {
    this.loadPendingItems();
  }

  loadPendingItems(): void {
    this.itemService.getPendingItems().subscribe(items => {
      this.pendingItems = items;
    });
  }

  formatPrice(price: number): string {
    return this.currencyPipe.transform(price, 'EUR', 'symbol', '1.2-2') || '';
  }

  approveItem(id: number): void {
    this.itemService.approveItem(id).subscribe(() => {
      this.loadPendingItems();
    });
  }

  rejectItem(id: number): void {
    this.itemService.rejectItem(id).subscribe(() => {
      this.loadPendingItems();
    });
  }
}