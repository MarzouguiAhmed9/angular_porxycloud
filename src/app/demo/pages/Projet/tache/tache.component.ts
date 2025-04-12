import { Component } from '@angular/core';
import { Tache } from '../tache';
import { Projet } from '../projet';
import { ProjetService } from 'src/app/ProjetService/projet.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-tache',
  imports: [CommonModule,SharedModule],
  templateUrl: './tache.component.html',
  styleUrl: './tache.component.scss'
})
export class TacheComponent {
  projets: Projet[] = [];
  tasks: Tache[] = [];
  selectedProjet!: Projet;
  selectedDescription: string = '';
  selectedStatus: string = '';
  showModal: boolean = false;
  isEditing: boolean = false;
  selectedTask!: Tache;
  statusEnum: string[] = ['NOT_BEGIN', 'EN_COURS', 'FINISHED']; // à adapter si enum côté backend

 constructor(private tacheService: ProjetService) {}



  ngOnInit(): void {

    this.loadProjets();
  }

 /* loadAllTaches(): void {
    this.tacheService.getAllTaches().subscribe((data) => {
      this.tasks = data;
    });
  }*/
  loadProjets(): void {
    this.tacheService.getAllProjets().subscribe({
      next: (data) => {
        this.projets = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projets', err);
      }
    });
  }
  
  loadTaches(projetId: number): void {
    this.selectedProjet = this.projets.find(p => p.idProjet === projetId)!;
    this.tacheService.getTachesByProjet(projetId).subscribe(data => {
      this.tasks = data;
    });
  }

  openEditTaskModal(task: Tache): void {
    this.selectedTask = task;
    this.selectedDescription = task.nomTache;
    this.selectedStatus = task.status;
    this.isEditing = true;
    this.showModal = true;
  }

  deleteTask(idTache: number): void {
    this.tacheService.deleteTache(idTache).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.idTache !== idTache);
    });
  }

  saveTask(): void {
    if (this.isEditing) {
      this.selectedTask.nomTache = this.selectedDescription;
      this.selectedTask.status = this.selectedStatus;
      this.tacheService.updateTache(this.selectedTask).subscribe(() => {
        this.closeModal();
      });
    } else {
      const newTask: Tache = {
        idTache: 0,
        nomTache: this.selectedDescription,
        dateDebut: new Date().toISOString(),
        dateFin: new Date().toISOString(),
        projet: this.selectedProjet,
        status: this.selectedStatus
      };
      this.tacheService.addTache(newTask).subscribe(data => {
        this.tasks.push(data);
        this.closeModal();
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedDescription = '';
    this.selectedStatus = '';
    this.isEditing = false;
  }
  openAddTaskModal(projet: Projet): void {
    this.selectedProjet = projet;
    this.selectedDescription = '';
    this.selectedStatus = '';
    this.isEditing = false;
    this.showModal = true;
  }
  
}
