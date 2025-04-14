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
      passwordRepeat: ['', Validators.required], 
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,  Validators.pattern(/^[245793][0-9]{7}$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      birthday: ['', [Validators.required, this.ageValidator]],
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
  ageValidator(control: any) {
    const birthDate = new Date(control.value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= 12 ? null : { ageTooYoung: true }; // Minimum 12 ans
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
      
      // Créez l'objet utilisateur selon ce qu'attend votre API
      const userData = {
        username: formValue.username,
        password: formValue.password,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        address: formValue.address,
        birthday: formValue.birthday,
        enabled: formValue.enabled,
        approuve: false, // Ajoutez si nécessaire
        role: {
          id: formValue.role,
          name: formValue.role === 2 ? 'CLIENT' : 'ADMIN' // Adaptez selon vos rôles
        }
      };
  
      console.log('Données envoyées:', userData); // Pour débogage
  
      this.userService.register(userData).subscribe(
        response => {
          console.log('✅ Inscription réussie', response);
          this.router.navigate(['/auth/signin']);
        },
        error => {
          console.error('❌ Erreur lors de l\'inscription', error);
          // Affichez plus de détails sur l'erreur
          alert(error.error?.message || error.message || "Une erreur est survenue. Veuillez réessayer.");
        }
      );
    }
  }
  onPhoneInput(event: any): void {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, ''); 
  }
}
