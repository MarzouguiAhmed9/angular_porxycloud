// user-profile.component.ts
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/serviceUser/profile.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule,SharedModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile: any = {}; 

  userProjects: any[] = [];
  inboxCount = 3;
  activeTab = 'projects';
  fileToUpload: File = null;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private userProfileService: ProfileService ,private http:HttpClient) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe(
      (profile) => {
        this.userProfile = profile;
        console.log('Profil chargé :', this.userProfile); // 👈 ici
      this.loadProfileImage();
      
      },
      (error) => {
        console.error('Erreur lors du chargement du profil', error);
      }
    );
  }
  
  
  onEditProfile() {
    // À connecter avec une modale ou un autre composant pour l'édition
    console.log('Mise à jour du profil demandée.');
  }
  

  loadUserProjects() {
    // Exemple statique, à remplacer par un vrai appel
    this.userProfile = [
      { title: 'Projet A', description: 'Description du projet A', status: 'En cours' },
      { title: 'Projet B', description: 'Description du projet B', status: 'Terminé' },
    ];
  }

  loadProfileImage() {
    const imageName = this.userProfile.imageUrl?.split('/').pop(); // extrait juste le nom

    console.log('Nom de l’image reçu :', imageName); // 🔍
    if (imageName) {
      this.userProfile.profileImageUrl = `http://localhost:8089/Projetback/api/auth/uploads/${imageName}`;

    }
  }
  
  
  

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      console.log('Fichier sélectionné :', this.selectedFile);
    } else {
      this.selectedFile = null;
      console.warn('Aucun fichier sélectionné.');
    }
  }
  
  onSubmit1() {
    if (!this.selectedFile || !(this.selectedFile instanceof File)) {
      console.error("Aucun fichier valide sélectionné");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name); // Vérifie le nom du paramètre ("file")
  
    const token = this.userProfileService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  
    // Vérifie que l'URL et la méthode sont corrects
    this.http.post('http://localhost:8089/Projetback/api/auth/user/upload-image', formData, {
      headers,
      responseType: 'text'
    }).subscribe(
      response => {
        console.log('Réponse du backend :', response);
        alert('Image envoyée avec succès !');
      },
      error => {
        console.error("Erreur lors de l'envoi de l'image", error);
        alert("Échec de l'upload");
      }
    );
  }
  
}  