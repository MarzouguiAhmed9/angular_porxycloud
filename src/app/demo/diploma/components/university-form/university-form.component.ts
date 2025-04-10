import { Component, EventEmitter, Output } from '@angular/core';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UniversityService } from 'src/app/demo/services/diploma/university-service.service';

@Component({
  selector: 'app-university-form',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './university-form.component.html',
  styleUrl: './university-form.component.scss'
})
export class UniversityFormComponent {
  selectedThumbnail: File | null = null;
  universityForm!: FormGroup;
  selectedFile: File | null = null;
  @Output() universityAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private universityService: UniversityService
  ) {}

  ngOnInit(): void {
    this.universityForm = this.fb.group({
      name: ['', [Validators.required]],
      ranking: [null, [Validators.required, Validators.min(1)]],
      description: [''],
      programSpecialty: [''],
      establishedYear: [null],
      address: [''],
      city: ['', [Validators.required]],
      state: [''],
      postalCode: [''],
      country: ['', [Validators.required]],
      website: ['', [Validators.required, Validators.pattern('https?://.+')]],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      type: [''],
      accreditationStatus: [''],
      logo: [''], // This will be handled by the file input
      thumbnail: [''] // This will be handled by the file input
    });
  }

  get f() {
    return this.universityForm.controls;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.universityForm.invalid) return;
    const formData = new FormData();
    // Append form controls
    Object.entries(this.universityForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    //! console.log(formData.get('thumbnail')['name']);

    this.universityService.addUniversity(this.universityForm.value).subscribe({
      next: () => {
        alert('University saved successfully!');
        this.universityAdded.emit();
      },
      error: (err) => console.error('Error saving university:', err)
    });
  }
}
