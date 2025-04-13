import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { Test } from 'src/app/models/test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-form',
  imports: [CardComponent ,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss'
})
export class TestFormComponent implements OnInit {

  formR!:FormGroup;
  constructor(private testService:TestService,private router:Router){
      
    }


  ngOnInit(): void {
    this.formR = new FormGroup({
      description: new FormControl('', [
        Validators.required, 
        Validators.minLength(5)
      ]),
      questions: new FormControl('', [
        Validators.required, 
        Validators.minLength(5)
      ]),
      choix: new FormControl('', [
        Validators.required, 
        Validators.minLength(5)
      ]),
      Rcorrecte: new FormControl('', [
        Validators.required, 
        Validators.pattern("^([0-9]+,)*[0-9]+$") // liste d'indices séparés par des virgules (ex : 0,1,2)
      ])
    })
    }
    get description(){
      return this.formR.get('description')
    }
    get questions(){
      return this.formR.get('questions')
    }
    get choix(){
      return this.formR.get('choix')
    }
    get Rcorrecte(){
      return this.formR.get('Rcorrecte')
    }

    add() {// Récupérer les valeurs du formulaire
      const questions = this.formR.value.questions.split(',');  // Séparer les questions par des virgules
      const choices = this.formR.value.choix.split(',');  // Séparer les choix par des virgules
      const correctAnswers = this.formR.value.Rcorrecte.split(',').map((index: string) => parseInt(index.trim()));  // Convertir les indices des bonnes réponses en tableau d'entiers
    
      const test: Test = {
        description: this.formR.value.description,
        questions: questions,
        choices: choices,
        correctAnswers: correctAnswers, // Utiliser correctAnswerIndices
        score: '0' // Ajouter un score si nécessaire
        ,
        id: 0
      };
    
      // Appeler le service pour ajouter le test
      this.testService.addTest(test).subscribe(() => {
        console.log('Test ajouté avec succès');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cours/test']);
        });
      });
    }


}
