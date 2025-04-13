import { Component } from '@angular/core';
import { Tache } from '../tache';
import { Projet } from '../projet';
import { ProjetService } from 'src/app/ProjetService/projet.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {  FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tache',
  imports: [CommonModule,SharedModule,FormsModule],
  templateUrl: './tache.component.html',
  styleUrl: './tache.component.scss'
})
export class TacheComponent {
  projets: Projet[] = [];
  tasks: Tache[] = [];
  selectedProjet!: Projet;
  selectedTask!: Tache;
  showModal: boolean = false;
  isEditing: boolean = false;
  taskForm!: FormGroup; // Déclaration du FormGroup
  statusEnum: string[] = ['NOT_BEGIN', 'EN_COURS', 'FINISHED']; // Enum des statuts

  constructor(private tacheService: ProjetService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadAllTaches();
    this.loadProjets();

    // Initialiser le formulaire réactif
    this.taskForm = this.fb.group({
      nomTache: ['', Validators.required],
      status: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required]
    });
  }

  loadAllTaches(): void {
    this.tacheService.getAllTaches().subscribe(data => {
      this.tasks = data;
    });
  }

  loadProjets(): void {
    this.tacheService.getAllProjets().subscribe(data => {
      this.projets = data;
    });
  }

  loadTaches(projetId: number): void {
    this.selectedProjet = this.projets.find(p => p.idProjet === projetId)!;
    this.tacheService.getTachesByProjet(projetId).subscribe(data => {
      this.tasks = data;
    });
  }

  
  
  saveTask(): void {
    if (this.selectedProjet) {
      if (this.isEditing) {
        this.selectedTask.nomTache = this.taskForm.value.nomTache;
        this.selectedTask.status = this.taskForm.value.status;
        this.selectedTask.dateDebut = this.taskForm.value.dateDebut;
        this.selectedTask.dateFin = this.taskForm.value.dateFin;
  
        this.tacheService.updateTache(this.selectedTask).subscribe(
          (data) => {
            const index = this.tasks.findIndex(t => t.idTache === data.idTache);
            if (index !== -1) {
              this.tasks[index] = data;
            }
            this.closeModal();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la tâche', error);
          }
        );
      } else {
        const newTask: Tache = {
          idTache: 0,
          nomTache: this.taskForm.value.nomTache,
          dateDebut: new Date().toISOString(),
          dateFin: new Date().toISOString(),
          projet: this.selectedProjet,
          status: this.taskForm.value.status
        };
  
        this.tacheService.addTache(newTask, this.selectedProjet.idProjet).subscribe(
          (data) => {
            this.tasks.push(data); // data est un seul objet Tache, pas un tableau
            this.closeModal();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la tâche', error);
          }
        );
      }
    } else {
      console.error('Le projet n\'est pas défini pour cette tâche.');
    }
  }
  
    
  

  closeModal(): void {
    this.showModal = false;
    this.isEditing = false;
    this.taskForm.reset();
  }

  deleteTask(idTache: number): void {
    this.tacheService.deleteTache(idTache).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.idTache !== idTache);
    });
  }
}
