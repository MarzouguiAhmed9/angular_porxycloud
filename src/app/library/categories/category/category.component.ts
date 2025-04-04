import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from "../../../theme/shared/components/card/card.component";

interface Category {
  idCategory: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, CardComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    // Load categories when the component is initialized
    this.getCategories();
  }

  // Get all categories from the backend
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response) => {
        console.log('Categories fetched:', response);  // Debug: Log the response
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        console.log('Error Status:', error.status);
        console.log('Error Message:', error.message);
        // Optionally display more info or show user-friendly messages here
      }
    );
  }
  
  // Add a new category to the backend
  addCategory(): void {
    if (this.categoryForm.valid) {
      const newCategory = this.categoryForm.value;
      this.categoryService.addCategory(newCategory).subscribe(
        (category) => {
          console.log('New category added:', category);  // Debug: Log the newly added category
          this.categories.push(category);
          this.categoryForm.reset();
        },
        (error) => {
          console.error('Error adding category:', error);  // Debug: Log the error
        }
      );
    }
  }

  // Delete an existing category from the backend
  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        console.log('Category deleted:', id);  // Debug: Log the deleted category ID
        this.categories = this.categories.filter(category => category.idCategory !== id);
      },
      (error) => {
        console.error('Error deleting category:', error);  // Debug: Log the error
      }
    );
  }

  // Optional: Method to handle category edits (not implemented yet)
  onEdit(category: Category): void {
    console.log('Editing category:', category);
    // You can implement edit functionality here
  }
}
