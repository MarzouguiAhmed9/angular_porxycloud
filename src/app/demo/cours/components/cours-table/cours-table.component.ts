import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../theme/shared/components/card/card.component";
import { Cours } from 'src/app/models/cours';
import { CoursService } from '../../services/cours.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-cours-table',
  imports: [CardComponent,CommonModule,RouterModule],
  templateUrl: './cours-table.component.html',
  styleUrl: './cours-table.component.scss'
})
export class CoursTableComponent implements OnInit {
 
  listC:Cours[] =[];
  // Ajoutez ces propriétés
  showPdfViewer: boolean[] = []; // Gère l'état pour chaque ligne
  currentPdfUrl: string | null = null;
  constructor(private coursservice:CoursService,private sanitizer: DomSanitizer){}

    ngOnInit(): void {
     this.coursservice.getallCours().subscribe((data)=>{
  this.listC=data;
  console.log("Données reçues :", this.listC); // Affiche les données pour vérifier si "image" existe

  this.showPdfViewer = new Array(this.listC.length).fill(false);
  
});
    }

    supprimercours(id:any){
      this.coursservice.deleteCours(id).subscribe(()=>{
        alert('le cours d"id: '+  id + ' est supprimer ');
       // console.log('le cours d"id: '+  id + ' est supprimer ');
        //window.location.reload()
        this.ngOnInit()
      })
    
    }


// Sécurise l'URL pour Angular
getSafeUrl(url: string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(
    `http://localhost/piARCTIC/${url}`
  );
}

toggleDocumentViewer(url: string | null, index: number) {
  // Ferme tous les autres visualiseurs
  this.showPdfViewer = this.showPdfViewer.map(() => false);

  if (this.currentPdfUrl === url) {
    // Si déjà ouvert, on le ferme
    this.currentPdfUrl = null;
  } else {
    this.currentPdfUrl = url;
  }
}



}
