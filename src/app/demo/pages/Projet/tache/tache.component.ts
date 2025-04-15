import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/ProjetService/projet.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Projet } from '../projet';
import { Tache } from '../tache';
import { UserService } from 'src/app/serviceUser/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tache',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {
  projets: Projet[] = [];
  idProjet: number | null = null;  // Assurez-vous que cette valeur est bien initialisée
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
  selectedProjectId: number | null = null;
  taches: Tache[] = [];
  
  constructor(
    private tacheService: ProjetService,
    private fb: FormBuilder,
    private userService: UserService,
    private http:HttpClient,
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

  onProjectSelect(): void {
    if (this.selectedProjectId) {
      this.idProjet = this.selectedProjectId; // Mettez à jour idProjet ici

      this.loadTaches(this.idProjet);
    }
  }

 loadTaches(projectId: number): void {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  // Assurez-vous que l'URL est correcte et que l'API renvoie bien un tableau de Taches
  this.http.get<Tache[]>(`http://localhost:8089/Projetback/api/projets/${projectId}/taches`, { headers })
    .subscribe({
      next: (data) => {
        console.log('Tâches récupérées pour le projet:', projectId);

        // Ne garder que l'ID et le nom de la tâche ainsi que l'ID et le nom du projet
        this.taches = data.map(task => ({
          idTache: task.idTache,
          nomTache: task.nomTache,
          projetId: task.projet?.idProjet,  // ID du projet
          projetNom: task.projet?.nomProjet,  // Nom du projet
          dateDebut: task.dateDebut,  // Conserver les propriétés requises par l'interface Tache
          dateFin: task.dateFin,
          status: task.status
        }));

        // Filtrer ou utiliser les tâches si nécessaire
        this.filteredTaches = [...this.taches]; // Utiliser une copie des tâches pour les filtrer si nécessaire
        console.log('Tâches après traitement:', this.taches);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des tâches :', err);
      }
    });
}


  loadProjets(): void {
    this.tacheService.getAllProjets().subscribe(data => {
     
      this.projets = data;
    });
  }
  loadAllTaches(): void {
    this.tacheService.getAllTaches().subscribe((data) => {
      console.log('Loaded Tasks:', data); // 👈 vérifie ici
      this.tasks = data;
      this.filteredTaches = data;
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
        console.error('Erreur complète :', error);
      
        const errorMsg = typeof error.error === 'string'
          ? error.error // <-- il récupère bien le message du backend
          : error.error?.message || 'Erreur inconnue';
      
        alert('Erreur : ' + errorMsg);
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
      projet: formValue.projet // 👈 doit contenir idProjet
    };
  
    this.tacheService.updateTache(updatedTask).subscribe(
      data => {
        const index = this.tasks.findIndex(t => t.idTache === updatedTask.idTache);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
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
  deleteTask(projectId: number, taskId: number): void {
    // Demande de confirmation avant la suppression
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
    
    if (!isConfirmed) {
      console.log('Suppression annulée.');
      return; // Si l'utilisateur annule, on arrête la suppression
    }
  
    console.log("Tentative de suppression de la tâche avec ID:", taskId, "du projet avec ID:", projectId);
    
    if (!projectId || !taskId) {
      console.error("Identifiant du projet ou de la tâche manquant !");
      alert('Échec de la suppression : Identifiant du projet ou de la tâche manquant !');
      return;
    }
    
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // URL de suppression de la tâche avec l'ID du projet et de la tâche
    const url = `http://localhost:8089/Projetback/api/projets/${projectId}/taches/${taskId}`;
    
    // Effectuer la suppression de la tâche via l'API et observer la réponse en texte brut
    this.http.delete(url, { headers, responseType: 'text' }).subscribe(
      (response) => {
        // La réponse est maintenant un texte brut
        console.log('Réponse du serveur:', response);
        if (response === 'Tâche supprimée avec succès.') {
          // Si la suppression est réussie, mettre à jour l'état de l'interface utilisateur
          this.tasks = this.tasks.filter(t => t.idTache !== taskId);
          this.filteredTaches = this.filteredTaches.filter(t => t.idTache !== taskId);
          console.log('Tâche supprimée avec succès.');
          alert('Tâche supprimée avec succès !'); // Affiche le message de succès
        } else {
          console.error('Échec de la suppression : Réponse inattendue du serveur', response);
          alert('Échec de la suppression : Une erreur est survenue.');
        }
      },
      (error) => {
        // Si l'erreur est renvoyée, afficher un message d'erreur
        console.error('Erreur lors de la suppression de la tâche:', error);
        alert('Échec de la suppression : Une erreur est survenue.');
      }
    );
  }
  
  
  
  

}
