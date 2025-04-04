import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../../../services/document.service';
import { Document } from '../../../models/document.model';
import { CardComponent } from '../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CardComponent]
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.getDocuments();
  }

  // Fetch documents from backend
  getDocuments(): void {
    this.documentService.getDocuments().subscribe(
      (response) => {
        console.log('Documents fetched:', response); // Debugging
        this.documents = response;
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  // Delete a document
  onDelete(documentId: number) {
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.deleteDocument(documentId).subscribe(
        () => {
          console.log('Document deleted:', documentId);
          this.documents = this.documents.filter(doc => doc.idDocument !== documentId);
        },
        (error) => {
          console.error('Error deleting document:', error);
        }
      );
    }
  }

  // Update a document (you can implement a form modal for updates)
  onUpdate(document: Document) {
    console.log('Update document: ', document);
  }
}
