import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ItemService } from 'src/app/marketplace/item.service';
import { UserService } from 'src/app/serviceUser/user.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class ClientComponent implements OnInit {
  myItems: any[] = [];
  user: any;
  categories = ['BOOKS', 'PROJECTS', 'RESOURCES', 'ELECTRONICS', 'OTHERS'];
  statuses = ['PENDING', 'APPROVED', 'REJECTED', 'SOLD'];
  
  // Formulaire réactif
  itemForm: FormGroup;
  isEditing = false;
  selectedFiles: File[] = [];
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private itemService: ItemService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['BOOKS', Validators.required],
      images: [[]]
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getUserDetails();
    if (!this.user) {
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
    this.itemForm.reset({
      category: 'BOOKS',
      price: 0,
      images: []
    });
    this.selectedFiles = [];
  }

  prepareEdit(item: any): void {
    this.isEditing = true;
    this.itemForm.patchValue({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      images: item.images || []
    });
    this.selectedFiles = [];
  }

  saveItem(): void {
    if (!this.userService.isTokenValid()) {
      alert('Session expired, please login again');
      this.router.navigate(['/auth/signin']);
      return;
    }

    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.itemForm.value;

    const formData = new FormData();
    formData.append('title', formValue.title);
    formData.append('description', formValue.description);
    formData.append('price', formValue.price.toFixed(2));
    formData.append('category', formValue.category);
    formData.append('sellerId', this.user.id.toString());

    if (this.selectedFiles.length > 0) {
      for (const file of this.selectedFiles) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} exceeds 5MB size limit`);
          this.isSubmitting = false;
          return;
        }
        if (!file.type.startsWith('image/')) {
          alert(`File ${file.name} is not an image`);
          this.isSubmitting = false;
          return;
        }
        formData.append('files', file, file.name);
      }
    }

    const save$ = this.isEditing && formValue.id
      ? this.itemService.updateItem(formValue.id, formData)
      : this.itemService.createItem(formData);

    save$.subscribe({
      next: () => {
        alert(`Item ${this.isEditing ? 'updated' : 'created'} successfully!`);
        this.loadMyItems();
        this.prepareCreate();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error:', err);
        alert(err.message || `Failed to ${this.isEditing ? 'update' : 'create'} item`);
        this.isSubmitting = false;
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
  getImageUrl(imagePath: string): string {
    return this.itemService.getImageUrl(imagePath);
}
  

  deleteItem(id: number): void {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }

    console.log('Attempting to delete item with ID:', id); // Log de débogage

    this.itemService.deleteItem(id).subscribe({
        next: () => {
            console.log('Item deleted successfully'); // Log de confirmation
            this.loadMyItems();
        },
        error: (err) => {
            console.error('Error deleting item:', err);
            
            // Message d'erreur plus informatif
            let errorMessage = 'Failed to delete item';
            if (err.status === 403) {
                errorMessage = 'You are not authorized to delete this item';
            } else if (err.status === 404) {
                errorMessage = 'Item not found';
            }
            
            alert(errorMessage);
        }
    });
}
}