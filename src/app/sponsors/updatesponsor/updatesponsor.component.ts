import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sponsor } from 'src/core/Sponsor';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesponsorsService } from '../servicesponsors.service';

@Component({
  selector: 'app-updatesponsor',
  templateUrl: './updatesponsor.component.html',
  styleUrls: ['./updatesponsor.component.css']
})
export class UpdatesponsorComponent implements OnInit {
  sponsorForm: FormGroup;
  sponsorId: any;
  currentSponsor: any;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: ServicesponsorsService
  ) {
    this.sponsorForm = this.fb.group({
      nomSponsor: ['', [Validators.required, Validators.minLength(3)]],
      descriptionSponsor: ['', [Validators.required, Validators.maxLength(500)]],
      contact: ['', [Validators.required, Validators.email]],
      siteWebSponsor: ['', [Validators.pattern('https?://.+')]],
      logo: ['']
    });
  }

  ngOnInit(): void {
    this.sponsorId = this.route.snapshot.params['idSponsor'];
    this.loadSponsorData();
  }

  loadSponsorData(): void {
    this.sponsorService.getSponsorById(this.sponsorId).subscribe(sponsor => {
      this.currentSponsor = sponsor;
      this.sponsorForm.patchValue(this.currentSponsor);
      
      // Si un logo existe, créer une preview
      if (this.currentSponsor.logo) {
        this.imagePreview = 'http://localhost:8081/gestionEvent/uploads/' + this.currentSponsor.logo;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Créer une preview de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.sponsorForm.valid) {
      const formData = new FormData();
      const sponsorData = {
        ...this.currentSponsor,
        ...this.sponsorForm.value,
        logo: this.selectedFile ? undefined : this.currentSponsor.logo
      };
  
      formData.append('sponsor', JSON.stringify(sponsorData));
      
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
  
      this.sponsorService.updateSponsor(this.sponsorId, formData).subscribe({
        next: () => {
          alert('Sponsor mis à jour avec succès');
          this.router.navigate(['/lists']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert("Erreur lors de la mise à jour. Vérifiez les données et réessayez.");
        }
      });
    }
  }

  // Getters pour les contrôles du formulaire
  get nomSponsor() { return this.sponsorForm.get('nomSponsor'); }
  get descriptionSponsor() { return this.sponsorForm.get('descriptionSponsor'); }
  get contact() { return this.sponsorForm.get('contact'); }
  get siteWebSponsor() { return this.sponsorForm.get('siteWebSponsor'); }
  get logo() { return this.sponsorForm.get('logo'); }
}
