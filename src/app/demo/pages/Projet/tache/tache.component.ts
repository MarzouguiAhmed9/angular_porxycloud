import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/ProjetService/projet.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Projet } from '../projet';
import { Tache } from '../tache';
import { UserService } from 'src/app/serviceUser/user.service';

@Component({
  selector: 'app-tache',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {
  projets: Projet[] = [];
  tasks: Tache[] = [];
  selectedTask!: Tache;
  isEditing: boolean = false;
  taskForm!: FormGroup;
  statusEnum: string[] = ['NOT_BEGIN', 'EN_COURS', 'FINISHED'];
  headers: any;
  userId: number | null = null;
  filterTerm: string = '';  // Champ de recherche
  allTaches: Tache[] = [];  // Toutes les tâches récupérées
  filteredTaches: Tache[] = [];  // Tâches filtrées
  selectedProjectId: string = ''; // Ou number selon ton modèle
  
  constructor(
    private tacheService: ProjetService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.headers = this.userService.getHeaders(); // headers pour les appels sécurisés
    this.userId = this.userService.getUserIdFromToken(); // récupérer l'ID de l'utilisateur connecté

    this.loadAllTaches();
    this.loadProjets();
    this.tacheService.getAllTaches().subscribe((taches) => {
      this.allTaches = taches;
      this.filteredTaches = [...this.allTaches];  // Initialisation des tâches filtrées
    });
    this.taskForm = this.fb.group({
      nomTache: ['', Validators.required],
      status: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      projet: [null, Validators.required]
    });
  }

  filterTachesByProject() {
    const idProjetNumber = Number(this.selectedProjectId); // 🔁 conversion en nombre
  
    if (!this.selectedProjectId) {
      this.filteredTaches = [...this.allTaches];  // Si aucun projet n'est sélectionné, affiche toutes les tâches
    } else {
      this.filteredTaches = this.allTaches.filter(
        (t) => t.projet?.idProjet === idProjetNumber
      );
    }
  }

  loadAllTaches(): void {
    this.tacheService.getAllTaches().subscribe(data => {
      this.tasks = data;
      this.filteredTaches = [...this.tasks];  // Initialisation des tâches filtrées
    });
  }

  loadProjets(): void {
    this.tacheService.getAllProjets().subscribe(data => {
      this.projets = data;
    });
  }

  addTask(): void {
    const formValue = this.taskForm.value;

    if (this.userId === null) {
      console.error('Utilisateur non connecté.');
      return;
    }

    const newTask: Tache = {
      idTache: 0,
      nomTache: formValue.nomTache,
      dateDebut: formValue.dateDebut,
      dateFin: formValue.dateFin,
      status: formValue.status,
      projet: formValue.projet,
      utilisateur: null
    };

    this.tacheService.addTache(newTask, formValue.projet.idProjet, this.userId, this.headers).subscribe(
      (data) => {
        this.tasks.push(data);
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la tâche', error);
      }
    );
  }

  updateTask(): void {
    const formValue = this.taskForm.value;
    const updatedTask: Tache = {
      ...this.selectedTask,
      nomTache: formValue.nomTache,
      dateDebut: formValue.dateDebut,
      dateFin: formValue.dateFin,
      status: formValue.status,
      projet: formValue.projet
    };

    this.tacheService.updateTache(updatedTask).subscribe(
      data => {
        const index = this.tasks.findIndex(t => t.idTache === data.idTache);
        if (index !== -1) {
          this.tasks[index] = data;
        }
        this.resetForm();
      },
      error => {
        console.error('Erreur lors de la mise à jour de la tâche', error);
      }
    );
  }

  onEdit(task: Tache): void {
    this.isEditing = true;
    this.selectedTask = task;

    this.taskForm.patchValue({
      nomTache: task.nomTache,
      status: task.status,
      dateDebut: task.dateDebut,
      dateFin: task.dateFin,
      projet: task.projet
    });
  }

  resetForm(): void {
    this.taskForm.reset();
    this.isEditing = false;
  }

  deleteTask(idProjet: number, idTache: number): void {
    console.log('hereeeeeee', idProjet);
    if (!idProjet || !idTache) {
      console.error("Identifiant du projet ou de la tâche manquant !");
      return;
    }
  
    this.tacheService.deleteTask(idProjet, idTache).subscribe(
      () => {
        // Suppression réussie, mettre à jour la liste des tâches
        this.tasks = this.tasks.filter(t => t.idTache !== idTache);
      },
      error => {
        console.error('Erreur lors de la suppression de la tâche', error);
      }
    );
  }
  
  

}
