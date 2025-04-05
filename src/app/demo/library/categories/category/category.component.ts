import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from "../../../../theme/shared/components/card/card.component";

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
  editMode = false;
  editingCategoryId: number | null = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;

      if (this.editMode && this.editingCategoryId !== null) {
        const updatedCategory: Category = {
          idCategory: this.editingCategoryId,
          ...formData
        };

        this.categoryService.updateCategory(updatedCategory).subscribe(
          (updated) => {
            const index = this.categories.findIndex(c => c.idCategory === updated.idCategory);
            if (index !== -1) this.categories[index] = updated;
            this.resetForm();
          },
          (error) => {
            console.error('Error updating category:', error);
          }
        );
      } else {
        this.categoryService.addCategory(formData).subscribe(
          (newCategory) => {
            this.categories.push(newCategory);
            this.resetForm();
          },
          (error) => {
            console.error('Error adding category:', error);
          }
        );
      }
    }
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter(c => c.idCategory !== id);
        if (this.editingCategoryId === id) this.resetForm(); // If deleted item is being edited
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }

  onEdit(category: Category): void {
    this.editMode = true;
    this.editingCategoryId = category.idCategory;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.editMode = false;
    this.editingCategoryId = null;
  }
}
