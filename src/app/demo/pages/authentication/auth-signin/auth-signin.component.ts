import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/serviceUser/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export default class AuthSigninComponent {
  username: string = '';
  password: string = '';
  user: any; // Variable pour stocker l'utilisateur connecté

  constructor(private authService: UserService, private router: Router) {}

  login(): void {
    const credentials = { username: this.username, password: this.password };
    
    this.authService.login(credentials).subscribe(
      (response) => {
        if (response.token) {
          this.authService.storeToken(response.token);
          console.log('Token stocké avec succès.');
          console.log('Token:', response.token); 
          this.user = this.authService.getUserDetails(); // Récupérer l'utilisateur connecté
          console.log('Utilisateur connecté:', this.user); // Afficher l'utilisateur dans la console
          

         
         
          
          const roles = this.authService.getUserRole(); // Obtenir les rôles
          console.log('Rôles de l’utilisateur connecté:', roles);
  
          if (roles && roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          console.error('❌ Token non trouvé dans la réponse');
        }
      },
      (error) => {
        console.error('❌ Échec de la connexion', error);
      }
    );
  }
  

  redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'ROLE_ADMIN':
        this.router.navigate(['/dashboard']);
        break;
      case 'ROLE_CLIENT':
        this.router.navigate(['/home']);
        break;
      default:
        this.router.navigate(['/guest']);
        break;
    }
  }
}
