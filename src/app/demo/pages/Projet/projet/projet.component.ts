import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/ProjetService/projet.service';
import { Projet } from '../projet';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projet',
  imports:[CommonModule, SharedModule, FormsModule],
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})

export class ProjetComponent implements OnInit {
  projets: Projet[] = [];
  selectedDescription: string = '';
  showModal: boolean = false;
  isDescriptionModal: boolean = false; // Variable pour savoir si c'est la description ou la modale d'édition
  modalPosition: { top: number; left: number } = { top: 0, left: 0 };
  isEditing: boolean = false;
  currentProjet: Projet = this.initNewProjet();

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

  // Ouvrir la modale pour l'édition ou la description complète
  openModal(isEditing: boolean, projet?: Projet, isDescription: boolean = false): void {
    this.isEditing = isEditing;
    this.isDescriptionModal = isDescription;
    if (isEditing && projet) {
      this.currentProjet = { ...projet }; // Préparer le projet pour l'édition
    } else if (isDescription) {
      this.selectedDescription = projet?.description || ''; // Afficher la description complète
    }
    this.showModal = true;
  }

  initNewProjet(): Projet {
    return {
      idProjet: 0,
      nomProjet: '',
      description: '',
      nbreGestions: 0,
      nbreMembreDisponible: 0,
      dateDebut: '',
      dateFin: '',
      createurNom: '',
      status: 'NOT BEGIN',
      taches: []
    };
  }

  saveProjet(): void {
    if (this.isEditing) {
      this.projetService.updateProjet(this.currentProjet).subscribe(
        () => {
          this.loadProjets();
          this.closeModal();
        },
        (error) => console.error('Erreur lors de la mise à jour du projet', error)
      );
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.currentProjet = this.initNewProjet(); // Réinitialiser après fermeture
  }

  deleteProjet(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.projetService.deleteProjet(id).subscribe(() => {
        this.loadProjets();
      });
    }
  }

  updateProjet(projet: Projet): void {
    this.openModal(true, projet); // Ouvrir la modale pour modifier un projet
  }

  openDescriptionModal(projet: Projet): void {
    this.openModal(false, projet, true); // Ouvrir la modale pour afficher la description complète
  }
}
