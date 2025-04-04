import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { DocumentService } from '../../../services/document.service';
import { DocumentType, DocumentStatus, Category } from '../../../models/document.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-document-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})
export class DocumentAddComponent implements OnInit {
  documentForm: FormGroup;
  documentTypes = Object.values(DocumentType);
  documentStatuses = Object.values(DocumentStatus);
  categories: Category[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.documentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      documentType: ['', Validators.required],
      keywords: ['', [Validators.required, Validators.minLength(3)]],
      status: [DocumentStatus.PENDING, Validators.required],
      file: [null, Validators.required],
      categories: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.documentForm.patchValue({
        file: this.selectedFile
      });
      this.documentForm.get('file')?.updateValueAndValidity();
    }
  }

  get f() {
    return this.documentForm.controls;
  }

  onSubmit() {
    if (this.documentForm.valid) {
      const formData = new FormData();
      formData.append('file', this.selectedFile as File);
      formData.append('title', this.documentForm.value.title);
      formData.append('description', this.documentForm.value.description);
      formData.append('documentType', this.documentForm.value.documentType);
      formData.append('keywords', this.documentForm.value.keywords);
      formData.append('status', this.documentForm.value.status);

      this.documentForm.value.categories.forEach((categoryId: number) => {
        formData.append('categoryIds', categoryId.toString());
      });

      this.documentService.addDocument(formData).subscribe({
        next: (response) => {
          console.log('Document added successfully', response);
          this.router.navigate(['/documents']);
        },
        error: (error) => {
          console.error('Error adding document', error);
          alert('Error adding document: ' + error.message);
        }
      });
    } else {
      this.markFormGroupTouched(this.documentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}