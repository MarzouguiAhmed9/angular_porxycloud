
import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from 'src/app/services/item.service';
import { CommonModule } from '@angular/common'; // ✅ ajoute ça
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-items',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-items.component.html',
  styleUrl: './admin-items.component.scss'
})
export class AdminItemsComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe((data) => {
      this.items = data;
    });
  }
}