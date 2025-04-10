import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-test-form',
  imports: [CardComponent ,FormsModule,ReactiveFormsModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss'
})
export class TestFormComponent implements OnInit {

  formR!:FormGroup;
  constructor(private testService:TestService,private router:Router){
      
    }


  ngOnInit(): void {
      this.formR = new FormGroup({
        description:new FormControl('',),
        questions:new FormControl('',),
        choix:new FormControl('',),
        Rcorrecte:new FormControl('',),  
  
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
