

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';  // Assurez-vous d'importer HttpClient
import { UserService } from 'src/app/serviceUser/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;  // Variable pour stocker le token

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router,
    private route: ActivatedRoute,  // Pour récupérer le token dans l'URL
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Récupérer le token depuis l'URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];  // Récupère le token de l'URL
    });

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  // Validation pour s'assurer que les mots de passe correspondent
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }
  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      const { password } = this.resetPasswordForm.value;
  
      // Construction de l'URL avec les paramètres dans la query string
      const resetData = {
        resetToken: this.token,
        newPassword: password
      };
  
      // Construction de l'URL avec les query parameters
      const url = `http://localhost:8089/Projetback/api/auth/reset-password?resetToken=${resetData.resetToken}&newPassword=${resetData.newPassword}`;
  
      // Appel API pour réinitialiser le mot de passe avec réponse en texte
      this.http.post(url, {}, { responseType: 'text' })
        .subscribe(
          response => {
            console.log('Réinitialisation réussie:', response);
            alert(response);  // Affiche le message de succès
            this.router.navigate(['/auth/signin']);  // Redirige l'utilisateur vers la page de login
          },
          error => {
            console.error('Erreur lors de la réinitialisation:', error);
            alert('Une erreur est survenue.');
          }
        );
    }
  }
  
  
  
  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  // Getter pour le password
  get password() {
    return this.resetPasswordForm.get('password');
  }
}
