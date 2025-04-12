import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/serviceUser/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  imports: [RouterModule, SharedModule],
  standalone: true,  // Assurez-vous d'ajouter cette ligne

})
export class LogoutComponent {

  constructor(private userService: UserService,private  router :Router) {}

  onLogout(): void {
    this.userService.logout();  // Appelle la méthode logout du UserService
    this.router.navigate(['/auth/signin']);  // Redirection vers la page de connexion

  }
}
