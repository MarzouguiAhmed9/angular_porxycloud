import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../marketplace/item.service';
import { UserService } from 'src/app/serviceUser/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.scss']
})
export class MyItemsComponent implements OnInit {
  items: any[] = [];
  currentUser: any;

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getUserDetails();
    this.loadItems();
  }

  loadItems(): void {
    if (this.currentUser && this.currentUser.id) {
      this.itemService.getMyItems(this.currentUser.id).subscribe(items => {
        this.items = items;
      });
    }
  }

  createItem(): void {
    this.router.navigate(['/client/items/new']);
  }

  editItem(id: number): void {
    this.router.navigate([`/client/items/edit/${id}`]);
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(id).subscribe(() => {
        this.loadItems();
      });
    }
  }
}