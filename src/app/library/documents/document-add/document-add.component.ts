import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { DocumentService } from '../../../services/document.service';
import { DocumentType, DocumentStatus } from '../../../models/document.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})
export class DocumentAddComponent {
  documentForm: FormGroup;
  documentTypes = Object.values(DocumentType);
  documentStatuses = Object.values(DocumentStatus);
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private router: Router
  ) {
    this.documentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      documentType: ['', Validators.required],
      keywords: ['', [Validators.required, Validators.minLength(3)]],
      status: [DocumentStatus.PENDING, Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
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