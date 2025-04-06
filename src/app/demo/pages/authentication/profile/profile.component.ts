// user-profile.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/serviceUser/profile.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile: any = null;
  userProjects: any[] = [];
  inboxCount = 3;
  activeTab = 'projects';

  constructor(private userProfileService: ProfileService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe(
      (profile) => {
        this.userProfile = profile;
      },
      (error) => {
        console.error('Error loading profile', error);
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

}
