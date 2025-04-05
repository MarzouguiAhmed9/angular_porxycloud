import { Component, OnInit } from '@angular/core';
import { ServicesponsorsService } from '../servicesponsors.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsponsors',
  templateUrl: './addsponsors.component.html',
  styleUrls: ['./addsponsors.component.css']
})
export class AddsponsorsComponent  implements OnInit {
  sponsorForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private sponsorService: ServicesponsorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sponsorForm = new FormGroup({
      nomSponsor: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descriptionSponsor: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      contact: new FormControl('', [Validators.required, Validators.email]), // Ajout de Validators.email
      logo: new FormControl('')
    });
  }

  // Accesseurs pour récupérer les contrôles du formulaire
  get nomSponsor() { return this.sponsorForm.get('nomSponsor'); }
  get descriptionSponsor() { return this.sponsorForm.get('descriptionSponsor'); }
  get contact() { return this.sponsorForm.get('contact'); }
  get logo() { return this.sponsorForm.get('logo'); }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addSponsor() {
    if (this.sponsorForm.valid) {
      const sponsorData = this.sponsorForm.value;
      
      if (this.selectedFile) {
        this.sponsorService.uploadLogo(this.selectedFile).subscribe({
          next: (logoPath: string) => {
            // Assurez-vous que le chemin est correct
            sponsorData.logo = logoPath; 
            this.createSponsor(sponsorData);
          },
          error: (err) => {
            console.error('Erreur lors du téléchargement du logo', err);
            alert("Erreur lors du téléchargement du logo: " + err.message);
          }
        });
      } else {
        this.createSponsor(sponsorData);
      }
    }
  }

  private createSponsor(sponsorData: any) {
    this.sponsorService.addSponsor(sponsorData).subscribe({
      next: (response) => {
        console.log('Sponsor ajouté avec succès', response);
        this.router.navigate(['/lists']);
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout", error);
        alert("Erreur lors de l'ajout du sponsor");
      }
    });
  }
}