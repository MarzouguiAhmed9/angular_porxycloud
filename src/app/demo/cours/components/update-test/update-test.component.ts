import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { TestService } from '../../services/test.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-update-test',
  imports: [CardComponent ,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './update-test.component.html',
  styleUrl: './update-test.component.scss'
})
export class UpdateTestComponent implements OnInit {

  idupadate!:number;
  formR!:FormGroup;
  listupdatetest:Test=new Test;

    constructor(private act:ActivatedRoute,private testService:TestService,private router:Router){
        
      }

  ngOnInit(): void {

    this.idupadate=this.act.snapshot.params['id']

    this.formR = new FormGroup({
      id:new FormControl('',),
      description:new FormControl('',),
      questions:new FormControl('',),
      choices:new FormControl('',),
      correctAnswers:new FormControl('',),  
    })

        this.testService.getTest(this.idupadate).subscribe((data)=>{
        this.listupdatetest=data
        console.log(this.listupdatetest)

      this.formR.patchValue(this.listupdatetest as any)
    })
    
  }
    get id(){
      return this.formR.get('id')
    }
    get description(){
      return this.formR.get('description')
    }
    get questions(){
      return this.formR.get('questions')
    }
    get choices(){
      return this.formR.get('choices')
    }
    get correctAnswers(){
      return this.formR.get('correctAnswers')
    }
    

    update() {// Récupérer les valeurs du formulaire
          // On vérifie si c’est un tableau ou une chaîne
      const questionsRaw = this.formR.value.questions;
      const choicesRaw = this.formR.value.choices;
      const correctAnswersRaw = this.formR.value.correctAnswers;

      const questions = Array.isArray(questionsRaw)
        ? questionsRaw
        : (questionsRaw ?? '').split(',').map((q: string) => q.trim());

      const choices = Array.isArray(choicesRaw)
        ? choicesRaw
        : (choicesRaw ?? '').split(',').map((c: string) => c.trim());

      const correctAnswers = Array.isArray(correctAnswersRaw)
        ? correctAnswersRaw.map((n: any) => parseInt(n))
        : (correctAnswersRaw ?? '')
            .split(',')
            .map((index: string) => parseInt(index.trim()))
            .filter((n) => !isNaN(n));
    
      const test: Test = {
        id: this.idupadate,
        description: this.formR.value.description,
        questions: questions,
        choices: choices,
        correctAnswers: correctAnswers, // Utiliser correctAnswerIndices
        score: '0' // Ajouter un score si nécessaire
        
      };
    
      // Appeler le service pour ajouter le test
      this.testService.updateTest(test).subscribe(() => {
        console.log('Test mis à jour avec succès');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cours/test']);
        });
      });
    }


}
