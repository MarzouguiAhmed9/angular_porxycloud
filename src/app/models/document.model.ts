export enum DocumentType {
  MEMOIRE = 'MEMOIRE',
  RAPPORT = 'RAPPORT',
  PFE = 'PFE',
  IMMERSION = 'IMMERSION',
  OTHER = 'OTHER'
}

export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum ReviewStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  idUser: number;
  name: string;
  email: string;
  department?: Department; // Added to match Java entity
}

export interface Department {
  idDepartment: number;
  name: string;
  description: string;
  users?: User[]; // Added to match Java entity
}

export interface Review {
  idReview: number;
  comments: string;
  status: ReviewStatus; // Changed from string to ReviewStatus enum
  reviewDate: string; // Should be LocalDateTime in Java, string in TypeScript
  reviewer: User;
  document: Document; // Added to match Java entity
}

export interface Category {
  idCategory: number;
  name: string;
  description: string;
  documents?: Document[]; // Added to match Java entity
}

export interface Document {
  idDocument: number;
  title: string;
  description: string;
  documentType: DocumentType;
  fileUrl: string;
  uploadDate: string; // Should be LocalDateTime in Java, string in TypeScript
  keywords: string;
  status: DocumentStatus;
  student: User;
  review?: Review;
  categories: Category[];
}