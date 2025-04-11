import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { CertificatService } from '../../services/certificat.service';
import { Certificat } from 'src/app/models/certificat';

@Component({
  selector: 'app-certificat-table',
  imports: [CardComponent,CommonModule,RouterModule],
  templateUrl: './certificat-table.component.html',
  styleUrl: './certificat-table.component.scss'
})
export class CertificatTableComponent implements OnInit {

  listC:Certificat[] =[];
  constructor(private certificatservice:CertificatService){}
  
      ngOnInit(): void {
       this.certificatservice.getallCertificat().subscribe((data)=>{
    this.listC=data;
    console.log("Données reçues :", this.listC); // Affiche les données pour vérifier si "image" existe

    
  });
      }
  
      supprimercertificat(id:any){
        this.certificatservice.deleteCertificat(id).subscribe(()=>{
          alert('le cours d"id: '+  id + ' est supprimer ');
         // console.log('le cours d"id: '+  id + ' est supprimer ');
          //window.location.reload()
          this.ngOnInit()
        })
      
      }

}
