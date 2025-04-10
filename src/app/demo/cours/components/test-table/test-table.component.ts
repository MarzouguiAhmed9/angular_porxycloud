import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { TestService } from '../../services/test.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-table',
  imports: [CardComponent,CommonModule,RouterModule],
  templateUrl: './test-table.component.html',
  styleUrl: './test-table.component.scss'
})
export class TestTableComponent implements OnInit {

    listT:Test[] =[];
    constructor(private testservice:TestService){}
  
      ngOnInit(): void {
       this.testservice.getallTest().subscribe((data)=>{
    this.listT=data;
    console.log("Données reçues :", this.listT); // Affiche les données pour vérifier si "image" existe
    
  });
      }

      splitTestDetails(test: Test): { question: string, choices: string[], correct: string }[] {
        const result: { question: string, choices: string[], correct: string }[] = [];
        
        for (let i = 0; i < test.questions.length; i++) {
          const question = test.questions[i];
          const startIndex = i * 3;
          const choices = test.choices.slice(startIndex, startIndex + 3);
          const correct = choices[test.correctAnswers[i]];
      
          result.push({ question, choices, correct });
        }
      
        return result;
      }

      supprimercours(id:any){
        this.testservice.deleteTest(id).subscribe(()=>{
          alert('le test d"id: '+  id + ' sera supprimer ');
         // console.log('le cours d"id: '+  id + ' est supprimer ');
          //window.location.reload()
          this.ngOnInit()
        })
      
      }

}
