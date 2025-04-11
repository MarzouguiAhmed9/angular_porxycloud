import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/ProjetService/projet.service';
import { Projet } from '../projet';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-projet',
  imports:[CommonModule,SharedModule],
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})

export class ProjetComponent implements OnInit {
  projets: Projet[] = [];
  selectedDescription: string = '';
  showModal: boolean = false;
  modalPosition: { top: number; left: number } = { top: 0, left: 0 }; // Position de la modal

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe({
      next: data => this.projets = data,
      error: err => console.error("Erreur lors du chargement des projets :", err)
    });
  }

  // Ouvrir la modal et positionner à côté de la description cliquée
  openModalAtPosition(event: MouseEvent, description: string): void {
    const element = event.target as HTMLElement;
    const rect = element.getBoundingClientRect();  // Récupérer la position de l'élément
    this.selectedDescription = description;
    this.showModal = true;

    // Définir la position de la modal
    this.modalPosition = {
      top: rect.top + window.scrollY, // Position verticale de l'élément
      left: rect.left + window.scrollX  // Position horizontale de l'élément
    };
  }

  closeModal(): void {
    this.selectedDescription = '';
    this.showModal = false;
  }

  deleteProjet(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.projetService.deleteProjet(id).subscribe(() => {
        this.loadProjets();
      });
    }
  }

  updateProjet(projet: Projet): void {
    // à relier à un formulaire ou modal plus tard
    console.log("Update projet :", projet);
  }
}
