import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ItemService } from 'src/app/marketplace/item.service';
import { UserService } from 'src/app/serviceUser/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class ClientComponent implements OnInit {
  myItems: any[] = [];
  user: any;
  categories = ['BOOKS', 'PROJECTS', 'RESOURCES', 'ELECTRONICS', 'OTHERS'];
  statuses = ['PENDING', 'APPROVED', 'REJECTED', 'SOLD'];
  
  // Pour le formulaire
  isEditing = false;
  currentItem: any = {
    title: '',
    description: '',
    price: 0,
    category: 'BOOKS',
    images: []
  };
  selectedFiles: File[] = [];

  constructor(
    private userService: UserService,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUserDetails();
    console.log('User details in component:', this.user);
    if (!this.user) {
      console.error('No user details available - redirecting to login');
      this.router.navigate(['/auth/signin']);
      return;
    }
    this.loadMyItems();
  }

  loadMyItems(): void {
    if (this.user && this.user.id) {
      this.itemService.getMyItems(this.user.id).subscribe({
        next: (items) => this.myItems = items,
        error: (err) => console.error('Error loading items', err)
      });
    }
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (this.selectedFiles.length < 5) {
          this.selectedFiles.push(files[i]);
        }
      }
    }
  }

  removeSelectedFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  prepareCreate(): void {
    this.isEditing = false;
    this.currentItem = {
      title: '',
      description: '',
      price: 0,
      category: 'BOOKS',
      images: []
    };
    this.selectedFiles = [];
  }

  prepareEdit(item: any): void {
    this.isEditing = true;
    this.currentItem = { ...item };
    if (!this.currentItem.images) {
      this.currentItem.images = [];
    }
    this.selectedFiles = [];
  }
  saveItem(): void {
    if (!this.userService.isTokenValid()) {
        alert('Session expired, please login again');
        this.router.navigate(['/auth/signin']);
        return;
    }

    // Validate required fields
    if (!this.currentItem.title || !this.currentItem.description || !this.currentItem.price) {
        alert('Please fill all required fields');
        return;
    }

    if (this.currentItem.price <= 0) {
        alert('Price must be positive');
        return;
    }

    const formData = new FormData();
    formData.append('title', this.currentItem.title);
    formData.append('description', this.currentItem.description);
    formData.append('price', this.currentItem.price.toFixed(2));
    formData.append('category', this.currentItem.category);
    formData.append('sellerId', this.user.id.toString());

    // Handle file uploads
    if (this.selectedFiles.length > 0) {
        for (const file of this.selectedFiles) {
            // Client-side validation
            if (file.size > 5 * 1024 * 1024) { // 5MB
                alert(`File ${file.name} exceeds 5MB size limit`);
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert(`File ${file.name} is not an image`);
                return;
            }
            formData.append('files', file, file.name);
        }
    }

    this.itemService.createItem(formData).subscribe({
        next: (res) => {
            alert('Item created successfully!');
            this.loadMyItems();
            this.prepareCreate();
        },
        error: (err) => {
            console.error('Error details:', err);
            alert(err.message || 'Failed to create item. Please check file requirements.');
        }
    });
}
  
  private logFormData(formData: FormData): void {
    console.log('--- FormData Contents ---');
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`${key}:`, `File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`${key}:`, value);
      }
    });
  }
  
  private debugFormData(formData: FormData): void {
    console.log('FormData contents:');
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(key, value.name, value.size, value.type);
      } else {
        console.log(key, value);
      }
    });
  }
  
  

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(id).subscribe({
        next: () => this.loadMyItems(),
        error: (err) => console.error('Error deleting item', err)
      });
    }
  }
}