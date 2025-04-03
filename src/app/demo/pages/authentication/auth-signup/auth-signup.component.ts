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
  availableRoles: Role[] = [];
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      password: ['', [
        Validators.required, 
        Validators.minLength(6),
        Validators.pattern(/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      ]],
      passwordRepeat: ['', Validators.required], // Ajout du champ de confirmation du mot de passe
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      address: [''],
      birthday: [''],
      enabled: [true],
      accountLocked: [false],
      role: [2]
    }, {
      validators: this.passwordsMatchValidator // Ajout d'un validateur personnalisé
    });

    this.loadRoles();
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const passwordRepeat = form.get('passwordRepeat')?.value;
    return password === passwordRepeat ? null : { passwordsMismatch: true };
  }

  loadRoles() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("❌ Aucun token trouvé, impossible de récupérer les rôles");
      return;
    }
  
    const decodedToken = this.decodeJwt(token);
    const userId = decodedToken?.id;
  
    if (!userId) {
      console.error("❌ ID utilisateur introuvable dans le token");
      return;
    }
  
    this.userService.getRoles(userId).subscribe(
      (roles: Role[]) => {
        this.availableRoles = roles;
        if (!this.registerForm.value.role) {
          this.registerForm.patchValue({ role: this.availableRoles[0]?.id });
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
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("❌ Erreur lors du décodage du token", error);
      return null;
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const userData = {
        ...formValue,
        role: { id: formValue.role }
      };
  
      this.userService.register(userData).subscribe(
        response => {
          console.log('✅ Inscription réussie', response);
          this.router.navigate(['/auth/signin']);
        },
        error => {
          console.error('❌ Erreur lors de l\'inscription', error);
          alert(error.error?.error || "Une erreur est survenue. Veuillez réessayer.");
        }
      );
    }
  }
}
