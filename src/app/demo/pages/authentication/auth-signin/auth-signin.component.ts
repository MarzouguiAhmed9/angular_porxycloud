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

  constructor(private authService: UserService, private router: Router) {}

  login(): void {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(
      (response) => {
        const token = response.token;
        this.authService.storeToken(token);
        this.redirectBasedOnRole(token);
      },
      (error) => {
        console.error('Login failed', error);
        console.error('Error details:', error?.error || error); 
      }
    );
  }

  redirectBasedOnRole(token: string): void {
    try {
      const decodedToken = this.decodeJwt(token);
      const role = decodedToken.role;  // Vérifie que le rôle est dans le token

      console.log('Role de l\'utilisateur:', role);

      if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/dashboard']);
      
      } else {
        // Si le rôle n'est pas reconnu, on peut rediriger vers une page par défaut ou afficher une erreur
        console.warn('Rôle inconnu, redirection par défaut');
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Erreur de décodage du jeton', error);
      this.router.navigate(['/login']); // Redirection en cas d'erreur
    }
  }

  decodeJwt(token: string): any {
    if (!token) {
      throw new Error('Token manquant');
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
}
