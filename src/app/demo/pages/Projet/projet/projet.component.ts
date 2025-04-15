import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/ProjetService/projet.service';
import { Projet } from '../projet';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Status } from '../Status';
import { UserService } from 'src/app/serviceUser/user.service';

@Component({
  selector: 'app-projet',
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
  projets: Projet[] = [];
  allProjets: Projet[] = [];
  selectedStatus: string = '';
  selectedDescription: string = '';
  showModal: boolean = false;
  isDescriptionModal: boolean = false;
  modalPosition: { top: number; left: number } = { top: 0, left: 0 };
  isEditing: boolean = false;
  currentProjet: Projet = this.initNewProjet();
  statusEnum = Status;
  userId!: number;
  constructor(private projetService: ProjetService, private userProfile: UserService) {}

  ngOnInit(): void {
    this.loadProjets();
    this.getUserId();
  }

  getUserId(): void {
    const userIdFromToken = this.userProfile.getUserIdFromToken();
    if (userIdFromToken) {
      this.userId = userIdFromToken;
    } else {
      console.log("Aucun ID utilisateur trouvé dans le token", "error");
    }
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
      status: Status.NOT_BEGIN,
      taches: [],
    };
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe({
      next: (data) => {
        this.allProjets = data;
        this.projets = [...this.allProjets];
      },
      error: (err) => console.error('Erreur lors du chargement des projets :', err),
    });
  }

  openModal(isEditing: boolean, projet?: Projet, isDescription: boolean = false): void {
    this.isEditing = isEditing;
    this.isDescriptionModal = isDescription;

    if (isEditing && projet) {
      this.currentProjet = { ...projet };
    } else if (isDescription) {
      this.selectedDescription = projet?.description || '';
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentProjet = this.initNewProjet();
  }

  saveProjet(): void {
    const formData = new FormData();
    
    // Adding fields from `this.currentProjet` to the FormData
    formData.append('nomProjet', this.currentProjet.nomProjet);
    formData.append('description', this.currentProjet.description);
    formData.append('nbreGestions', this.currentProjet.nbreGestions.toString());
    formData.append('nbreMembreDisponible', this.currentProjet.nbreMembreDisponible.toString());
    formData.append('dateDebut', this.currentProjet.dateDebut);
    formData.append('dateFin', this.currentProjet.dateFin);
    formData.append('status', this.currentProjet.status);

    // If editing
    if (this.isEditing) {
      this.projetService.updateProjet(this.currentProjet).subscribe({
        next: () => {
          this.loadProjets();
          this.closeModal();
          alert("Mise à jour réussie du projet !");
        },
        error: (error) => console.error('Erreur lors de la mise à jour du projet', error),
      });
    } else {
      // If adding a new project
      this.projetService.ajouterProjet(formData).subscribe({
        next: () => {
          this.loadProjets();
          this.closeModal();
          alert("Projet ajouté avec succès !");
        },
        error: (error) => console.error("Erreur lors de l'ajout du projet", error),
      });
    }
  }

  deleteProjet(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projetService.deleteProjet(id).subscribe({
        next: () => {
          this.loadProjets();
          alert("Projet supprimé avec succès !");
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du projet', err);
          alert("Erreur lors de la suppression du projet.");
        },
      });
    }
  }

  updateProjet(projet: Projet): void {
    this.openModal(true, projet);
  }

  openDescriptionModal(projet: Projet): void {
    this.openModal(false, projet, true);
  }

  filterProjets(): void {
    if (this.selectedStatus === '') {
      this.projets = [...this.allProjets];
    } else {
      this.projets = this.allProjets.filter((p) => p.status === this.selectedStatus);
    }
  }
}
