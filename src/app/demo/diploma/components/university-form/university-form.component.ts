import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UniversityService } from 'src/app/demo/services/diploma/university-service.service';
import { University } from 'src/app/models/university.model';

@Component({
  selector: 'app-university-form',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './university-form.component.html',
  styleUrl: './university-form.component.scss'
})
export class UniversityFormComponent {
  @Input() universityToEdit: University | null = null;
  @Output() universityAdded = new EventEmitter<void>();
  selectedThumbnail: File | null = null;
  universityForm!: FormGroup;
  selectedFile: File | null = null;
  updatedUniversityId: number;

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
  isEditMode = false;
  onSubmit(): void {
    if (this.universityForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.universityForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (this.isEditMode) {
      // Update existing university
      this.universityForm.value.universityId = this.updatedUniversityId;
      this.universityService.updateUniversity(this.universityForm.value).subscribe({
        next: () => {
          alert('University updated successfully!');
          this.resetForm();
          this.universityAdded.emit();
        },
        error: (err) => console.error('Error updating university:', err)
      });
    } else {
      // Add new university
      this.universityService.addUniversity(this.universityForm.value).subscribe({
        next: () => {
          alert('University saved successfully!');
          this.resetForm();
          this.universityAdded.emit();
        },
        error: (err) => console.error('Error saving university:', err)
      });
    }
  }
  // Update populateForm to set edit mode flag
  populateForm(university: University | null) {
    if (university) {
      this.isEditMode = true;
      this.updatedUniversityId = university.universityId;
      this.universityForm.patchValue({
        universityId: university.universityId,
        name: university.name,
        ranking: university.ranking,
        description: university.description,
        programSpecialty: university.programSpecialty,
        establishedYear: university.establishedYear,
        address: university.address,
        city: university.city,
        state: university.state,
        postalCode: university.postalCode,
        country: university.country,
        website: university.website,
        phoneNumber: university.phoneNumber,
        email: university.email,
        type: university.type,
        accreditationStatus: university.accreditationStatus
      });
    }
  }

  // Add a method to reset the form
  resetForm(): void {
    this.universityForm.reset();
    this.isEditMode = false;
    this.universityToEdit = null;
    this.selectedFile = null;
    this.selectedThumbnail = null;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['universityToEdit'] && changes['universityToEdit'].currentValue && !changes['universityToEdit'].firstChange) {
      const university = changes['universityToEdit'].currentValue;
      this.populateForm(university);
    }
  }
}
