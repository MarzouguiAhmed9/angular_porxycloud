import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/serviceUser/user.service';

@Component({
  selector: 'app-forgot',
   imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent {
  forgotForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotForm.get('email');
  }

  onSubmit() {
    if (this.forgotForm.invalid) {
      return;
    }

    const email = this.forgotForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        // Après le succès, on peut rediriger vers la page de login ou laisser l'utilisateur en attente
      },
      error: (err) => {
        this.errorMessage = err.error?.error || "Une erreur s'est produite";
        this.successMessage = '';
      },
    });
  }
}
