import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/models/cours';
import { Test } from 'src/app/models/test';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { CoursService } from '../../services/cours.service';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affect-test-cours',
  imports: [CardComponent,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './affect-test-cours.component.html',
  styleUrl: './affect-test-cours.component.scss'
})
export class AffectTestCoursComponent implements OnInit {

  listC:Cours[] =[];
  listT:Test[] =[];
  formR!:FormGroup;
  constructor(private coursservice:CoursService,private testservice:TestService,private router:Router){}
  
  ngOnInit(): void {
    this.coursservice.getallCours().subscribe((data)=>{
 this.listC=data;
 console.log("Données reçues :", this.listC); // Affiche les données pour vérifier si "image" existe

});
this.testservice.getallTest().subscribe((data)=>{
  this.listT=data;
  console.log("Données reçues :", this.listT); // Affiche les données pour vérifier si "image" existe
 
 });
 this.formR = new FormGroup({
       test:new FormControl('',),
       cours:new FormControl('',),
      })
   }

   affect() {
    const idCours = this.formR.value.cours;
  const idTest = this.formR.value.test;

  this.coursservice.affectTestToCours(idCours, idTest).subscribe(() => {
    console.log("Affectation réussie !");
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/cours/cours']);
    });
  }, error => {
    console.error("Erreur lors de l'affectation :", error);
  });
  }

}
