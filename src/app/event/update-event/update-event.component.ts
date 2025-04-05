import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { myEvent } from 'src/core/models/event';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sponsor } from 'src/core/Sponsor';
import { ServicesponsorsService } from 'src/app/sponsors/servicesponsors.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  eventForm: FormGroup;
  eventId: any;
  currentEvent: any;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  sponsors: Sponsor[] = [];
  selectedSponsorIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService ,
    private sponsorService: ServicesponsorsService
  ) {
    this.eventForm = this.fb.group({
      nomEvent: ['', [Validators.required, Validators.minLength(3)]],
      descriptionEvent: ['', [Validators.required, Validators.maxLength(500)]],
      imageEvent: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      lieu: ['', [Validators.required, Validators.maxLength(100)]],
      capaciteMax: [1, [Validators.required, Validators.min(1)]],
      prix: [0, [Validators.required, Validators.min(0)]],
      statut: ['', [Validators.required, Validators.pattern(/^(Actif|Annulé|Complet|Terminé)$/)]],
      typeEvenement: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['idEvent'];
    this.loadEventData();
    this.loadSponsors();
  }

  loadEventData(): void {
    this.eventService.getEventById(this.eventId).subscribe(event => {
      this.currentEvent = event;
      this.eventForm.patchValue(this.currentEvent as any);
      
      // Pré-sélectionner les sponsors existants
      if (event.sponsors) {
        this.selectedSponsorIds = event.sponsors
          .filter(s => s.idSponsor)
          .map(s => s.idSponsor!);
      }
    });
  }

  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
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

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = new FormData();
      const eventData = {
        ...this.currentEvent,
        ...this.eventForm.value,
        dateDebut: new Date(this.eventForm.value.dateDebut).toISOString(),
        dateFin: new Date(this.eventForm.value.dateFin).toISOString(),
        imageEvent: this.selectedFile ? null : this.currentEvent.imageEvent
      };
  
      formData.append('event', new Blob([JSON.stringify(eventData)], {
        type: 'application/json'
      }));
      
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }
  
      this.eventService.updateEventWithImageAndSponsors(
        this.eventId, 
        formData,
        this.selectedSponsorIds
      ).subscribe({
        next: () => this.router.navigate(['/list']),
        error: (err) => {
          console.error('Update failed:', err);
          alert("Erreur lors de la mise à jour. Vérifiez les données et réessayez.");
        }
      });
    }
  }

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
}

