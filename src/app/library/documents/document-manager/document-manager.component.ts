import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../../../services/document.service';
import { CategoryService } from '../../../services/category.service';
import { Document, DocumentType, DocumentStatus, Category } from '../../../models/document.model';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-document-manager',
  standalone: true,
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, CardComponent]
})
export class DocumentManagerComponent implements OnInit {
  documentForm: FormGroup;
  documentTypes = Object.values(DocumentType);
  documentStatuses = Object.values(DocumentStatus);
  categories: Category[] = [];
  documents: Document[] = [];
  selectedFile: File | null = null;
  editMode = false;
  editingDocumentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private categoryService: CategoryService
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

  ngOnInit(): void {
    this.loadCategories();
    this.getDocuments();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  getDocuments(): void {
    this.documentService.getDocuments().subscribe({
      next: (res) => this.documents = res,
      error: (err) => console.error('Error loading documents', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.documentForm.patchValue({ file: this.selectedFile });
      this.documentForm.get('file')?.updateValueAndValidity();
    }
  }

  get f() {
    return this.documentForm.controls;
  }

  onSubmit(): void {
    if (this.editMode) {
      // In edit mode, file is optional.
      if (this.documentForm.valid) {
        const formData = new FormData();
        // Append new file only if selected
        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }
        formData.append('title', this.documentForm.value.title);
        formData.append('description', this.documentForm.value.description);
        formData.append('documentType', this.documentForm.value.documentType);
        formData.append('keywords', this.documentForm.value.keywords);
        formData.append('status', this.documentForm.value.status);
        this.documentForm.value.categories.forEach((id: number) => {
          formData.append('categoryIds', id.toString());
        });
        // Append the document ID for update
        formData.append('idDocument', this.editingDocumentId!.toString());
        this.documentService.updateDocument(formData).subscribe({
          next: (updatedDocument) => {
            const index = this.documents.findIndex(doc => doc.idDocument === updatedDocument.idDocument);
            if (index !== -1) {
              this.documents[index] = updatedDocument;
            }
            this.resetForm();
          },
          error: (err) => console.error('Error updating document', err)
        });
      } else {
        this.markFormGroupTouched(this.documentForm);
      }
    } else {
      // Add mode: file must be selected
      if (this.documentForm.valid && this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('title', this.documentForm.value.title);
        formData.append('description', this.documentForm.value.description);
        formData.append('documentType', this.documentForm.value.documentType);
        formData.append('keywords', this.documentForm.value.keywords);
        formData.append('status', this.documentForm.value.status);
        this.documentForm.value.categories.forEach((id: number) => {
          formData.append('categoryIds', id.toString());
        });
        this.documentService.addDocument(formData).subscribe({
          next: (newDocument) => {
            this.documents.push(newDocument);
            this.resetForm();
          },
          error: (err) => console.error('Error adding document', err)
        });
      } else {
        this.markFormGroupTouched(this.documentForm);
      }
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onDelete(documentId: number): void {
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.deleteDocument(documentId).subscribe({
        next: () => this.documents = this.documents.filter(doc => doc.idDocument !== documentId),
        error: (err) => console.error('Error deleting document', err)
      });
    }
  }

  onEdit(document: Document): void {
    console.log('Editing document:', document);
    this.editMode = true;
    this.editingDocumentId = document.idDocument;
    // Patch the form with document values.
    this.documentForm.patchValue({
      title: document.title,
      description: document.description,
      documentType: document.documentType,
      keywords: document.keywords,
      status: document.status,
      categories: document.categories ? document.categories.map(c => c.idCategory) : []
    });
    // For edit mode, clear file validators so file is optional.
    this.selectedFile = null;
    const fileControl = this.documentForm.get('file');
    fileControl?.clearValidators();
    fileControl?.updateValueAndValidity();
    fileControl?.setValue(null);
  }

  resetForm(): void {
    this.documentForm.reset();
    // Re-add required validator for file in add mode.
    this.documentForm.get('file')?.setValidators(Validators.required);
    this.documentForm.get('file')?.updateValueAndValidity();
    this.editMode = false;
    this.editingDocumentId = null;
    this.selectedFile = null;
  }
}
