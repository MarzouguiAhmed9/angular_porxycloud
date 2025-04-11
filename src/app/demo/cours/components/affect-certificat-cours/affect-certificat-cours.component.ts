import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Certificat } from 'src/app/models/certificat';
import { Cours } from 'src/app/models/cours';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { CoursService } from '../../services/cours.service';
import { CertificatService } from '../../services/certificat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affect-certificat-cours',
  imports: [CardComponent,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './affect-certificat-cours.component.html',
  styleUrl: './affect-certificat-cours.component.scss'
})
export class AffectCertificatCoursComponent {

    listC:Cours[] =[];
    listCert:Certificat[] =[];
    formR!:FormGroup;
    constructor(private coursservice:CoursService,private certificatservice:CertificatService,private router:Router){}
    
    ngOnInit(): void {
      this.coursservice.getallCours().subscribe((data)=>{
   this.listC=data;
   console.log("Données reçues :", this.listC); // Affiche les données pour vérifier si "image" existe
  
  });
  this.certificatservice.getallCertificat().subscribe((data)=>{
    this.listCert=data;
    console.log("Données reçues :", this.listCert); // Affiche les données pour vérifier si "image" existe
   
   });
   this.formR = new FormGroup({
         certificat:new FormControl('',),
         cours:new FormControl('',),
        })
     }

     affect() {
      const idCours = this.formR.value.cours;
      const idCert = this.formR.value.certificat;
  
    this.coursservice.affectCertificatToCours(idCours, idCert).subscribe(() => {
      console.log("Affectation réussie !");
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cours/cours']);
      });
    }, error => {
      console.error("Erreur lors de l'affectation :", error);
    });
    }

}
