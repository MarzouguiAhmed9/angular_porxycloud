import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/serviceUser/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

interface Role {
  id: number;
  name: string;
}

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export default class AuthSignupComponent {
  registerForm!: FormGroup;
  availableRoles: Role[] = [];  // Récupérer dynamiquement les rôles
  errorMessages: { [key: string]: string } = {};
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec un seul rôle par défaut
    this.registerForm = this.fb.group({
      username: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^[a-zA-Z0-9_]+$/) // S'assurer qu'il n'y a pas d'espaces ou de caractères spéciaux
        ]
      ],
      password: [
        '', 
        [
          Validators.required, 
          Validators.minLength(6),
          Validators.pattern(/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/), // S'assurer qu'il contient au moins 1 chiffre, 1 majuscule et 1 caractère spécial
        ]
      ],
      firstName: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^[a-zA-Z]+$/) // S'assurer qu'il contient uniquement des lettres
        ]
      ],
      lastName: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^[a-zA-Z]+$/) // S'assurer qu'il contient uniquement des lettres
        ]
      ],
      email: [
        '', 
        [
          Validators.required, 
          Validators.email
        ]
      ],
      phone: [
        '', 
        [
          Validators.pattern(/^\+?[1-9]\d{1,14}$/) // Validation pour le numéro de téléphone international
        ]
      ],
      address: [''],
      birthday: [''],
      enabled: [true],
      accountLocked: [false],
      role: [1]  // Rôle par défaut (id 1)
    });

    // Charger les rôles depuis l'API
    this.loadRoles();
  }

  loadRoles() {
    const token = localStorage.getItem('token'); // Récupérer le token stocké
    if (!token) {
      console.error("❌ Aucun token trouvé, impossible de récupérer les rôles");
      return;
    }
  
    const decodedToken = this.decodeJwt(token);  // Décoder le token JWT
    const userId = decodedToken?.id;  // Récupérer l'ID utilisateur
  
    if (!userId) {
      console.error("❌ ID utilisateur introuvable dans le token");
      return;
    }
  
    this.userService.getRoles(userId).subscribe(
      (roles: Role[]) => {
        this.availableRoles = roles;
        if (!this.registerForm.value.role) {
          this.registerForm.patchValue({
            role: this.availableRoles[0]?.id  // Sélectionner le premier rôle par défaut
          });
        }
      },
      error => {
        console.error("❌ Erreur lors du chargement des rôles", error);
      }
    );
  }

  decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      console.log('Payload du token:', decodedPayload);  // Affiche le contenu complet du token
      return decodedPayload;
    } catch (error) {
      console.error("❌ Erreur lors du décodage du token", error);
      return null;
    }
  }

  // Fonction de soumission du formulaire
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const userData = {
        ...formValue,
        role: { id: formValue.role }  // Envoie le rôle sous forme d'objet avec id
      };
  
      this.userService.register(userData).subscribe(
        response => {
          console.log('✅ Inscription réussie', response);
          this.router.navigate(['/auth/signin']);
        },
        error => {
          console.error('❌ Erreur lors de l\'inscription', error);
          
          if (error.status === 400 && error.error?.error) {
            alert(error.error.error);  // Affichage de l'erreur côté frontend
          } else {
            alert("Une erreur est survenue. Veuillez réessayer.");
          }
        }
      );
    }
  }
}
