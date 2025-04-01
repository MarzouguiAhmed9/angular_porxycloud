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
  imports: [RouterModule,SharedModule],
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
    // Initialisation du formulaire avec des rôles par défaut (ROLE_ADMIN)
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
      roles: [[1]]  // ROLE_ADMIN (id 1) par défaut
    });


    // Charger les rôles depuis l'API
    this.loadRoles();
  }

  loadRoles() {
    this.userService.getRoles().subscribe(
      (roles: Role[]) => {
        this.availableRoles = roles;
        // Assurez-vous que le premier rôle est sélectionné par défaut
        if (!this.registerForm.value.roles || this.registerForm.value.roles.length === 0) {
          this.registerForm.patchValue({
            roles: [this.availableRoles[0]?.id]  // Sélectionner le premier rôle par défaut
          });
        }
      },
      error => {
        console.error("Erreur lors du chargement des rôles", error);
      }
    );
  }

  // Fonction de soumission du formulaire
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const userData = {
        ...formValue,
        roles: formValue.roles.map((roleId: number) => ({ id: roleId }))
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
