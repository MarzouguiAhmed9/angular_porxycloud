import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/serviceUser/user.service';
import { ItemService } from 'src/app/marketplace/item.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true, // Add this if you're using standalone components
  imports: [CommonModule, RouterModule] // Add this to import necessary modules
})
export class ClientDashboardComponent implements OnInit {
  myItems: any[] = [];
  user: any;

  constructor(
    private userService: UserService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUserDetails();
    this.loadMyItems();
  }

  loadMyItems(): void {
    if (this.user && this.user.id) {
      this.itemService.getMyItems(this.user.id).subscribe(items => {
        this.myItems = items;
      });
    }
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(id).subscribe(() => {
        this.loadMyItems();
      });
    }
  }
}