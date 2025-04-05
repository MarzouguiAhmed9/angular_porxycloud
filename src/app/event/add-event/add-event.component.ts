import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Sponsor } from 'src/core/Sponsor';
import { ServicesponsorsService } from 'src/app/sponsors/servicesponsors.service';

// Validateur pour la date de début
export function dateDebutValidator(control: AbstractControl): ValidationErrors | null {
  const value = new Date(control.value);
  // Vérifier si la date de début est dans le futur ou aujourd'hui
  if (value < new Date()) {
    return { dateDebutInvalid: true }; // La date doit être aujourd'hui ou après
  }
  return null; // Date valide
}

// Validateur pour la date de fin
export function dateFinValidator(control: AbstractControl): ValidationErrors | null {
  const dateDebut = new Date(control.parent?.get('dateDebut')?.value); // Récupérer la date de début du parent
  const dateFin = new Date(control.value);

  if (dateFin < dateDebut) {
    return { dateFinInvalid: true }; // La date de fin doit être égale ou après la date de début
  }
  return null; // Date valide
}

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm!: FormGroup;
  selectedFile: File | null = null;
  sponsors: Sponsor[] = [];
  selectedSponsorIds: number[] = [];


  constructor(private eventService: EventService, private router: Router ,   private sponsorService: ServicesponsorsService // Ajoutez ce service
  ) {}

  ngOnInit(): void {
    this.loadSponsors();
    this.eventForm = new FormGroup({
      nomEvent: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descriptionEvent: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      imageEvent: new FormControl(''), // Nouveau champ pour l'image
      dateDebut: new FormControl('', [Validators.required, dateDebutValidator]), // validation dateDebut
      dateFin: new FormControl('', [Validators.required, dateFinValidator]), // validation dateFin
      lieu: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      capaciteMax: new FormControl('', [Validators.required, Validators.min(1)]),
      prix: new FormControl('', [Validators.required, Validators.min(0)]),
      statut: new FormControl('', [Validators.required, Validators.pattern(/^(Actif|Annulé|Complet|Terminé)$/)]),
      typeEvenement: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  // Accesseurs pour récupérer les contrôles du formulaire
  get nomEvent() { return this.eventForm.get('nomEvent'); }
  get descriptionEvent() { return this.eventForm.get('descriptionEvent'); }
  get imageEvent() { return this.eventForm.get('imageEvent'); }
  get dateDebut() { return this.eventForm.get('dateDebut'); }
  get dateFin() { return this.eventForm.get('dateFin'); }
  get lieu() { return this.eventForm.get('lieu'); }
  get capaciteMax() { return this.eventForm.get('capaciteMax'); }
  get prix() { return this.eventForm.get('prix'); }
  get statut() { return this.eventForm.get('statut'); }
  get typeEvenement() { return this.eventForm.get('typeEvenement'); }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
}

loadSponsors(): void {
  this.sponsorService.getSponsors().subscribe(
    (sponsors: Sponsor[]) => this.sponsors = sponsors,
    (error: any) => console.error('Error loading sponsors', error)
  );
}

onSponsorSelect(sponsorId: number, isChecked: boolean): void {
  if (isChecked) {
    this.selectedSponsorIds.push(sponsorId);
  } else {
    this.selectedSponsorIds = this.selectedSponsorIds.filter(id => id !== sponsorId);
  }
}

addEvent() {
  if (this.eventForm.valid) {
    const eventData = this.eventForm.value;
    
    this.eventService.addEventWithImageAndSponsors(
      eventData, 
      this.selectedFile,
      this.selectedSponsorIds
    ).subscribe({
      next: (response) => {
        console.log('Événement ajouté avec succès', response);
        this.router.navigate(['/list']);
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout", error);
        alert("Erreur lors de l'ajout de l'événement");
      }
    });
  }
}
}
