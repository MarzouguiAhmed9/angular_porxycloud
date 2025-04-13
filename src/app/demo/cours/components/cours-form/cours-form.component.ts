import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { CoursService } from '../../services/cours.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms'; // <-- Import here
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cours-form',
  imports: [CardComponent ,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './cours-form.component.html',
  styleUrl: './cours-form.component.scss'
})
export class CoursFormComponent implements OnInit {

  formR!:FormGroup;
  selectedImage: File | null = null; // Stocke l'image sélectionnée
  selectedDocument: File | null = null;

  constructor(private coursservice:CoursService,private router:Router){
    
  }

  ngOnInit(): void {
    this.formR = new FormGroup({
      titre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      auteur: new FormControl('', [Validators.required]),
      categorie: new FormControl('', [Validators.required]),
      langue: new FormControl('', [Validators.required]),
      duree: new FormControl('', [Validators.required, Validators.min(1)]),
      prix: new FormControl('', [Validators.required, Validators.min(0)]),
      niveau: new FormControl('', [
        Validators.required,
        Validators.pattern("^(DEBUTANT|INTERMEDIAIRE|AVANCE)$")
      ]),
      image: new FormControl(''),
      document: new FormControl('')
    });
  }
 
  get titre(){
    return this.formR.get('titre')
  }
  get description(){
    return this.formR.get('description')
  }
  get auteur(){
    return this.formR.get('auteur')
  }
  get categorie(){
    return this.formR.get('categorie')
  }
  get langue(){
    return this.formR.get('langue')
  }
  get duree(){
    return this.formR.get('duree')
  }
  get niveau(){
    return this.formR.get('niveau')
  }
  
  get prix(){
    return this.formR.get('prix')
  }

  // Capture le fichier sélectionné
  onFileSelected(event: any,fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'image') {
      this.selectedImage = file;
    } else if (fileType === 'document') {
      this.selectedDocument = file;
    }
  }

  // Fonction pour envoyer les données
  add() {
    const formData = new FormData();
    formData.append('titre', this.formR.value.titre);
    formData.append('description', this.formR.value.description);
    formData.append('auteur', this.formR.value.auteur);
    formData.append('categorie', this.formR.value.categorie);
    formData.append('langue', this.formR.value.langue);
    formData.append('duree', this.formR.value.duree);
    formData.append('prix', this.formR.value.prix);
    formData.append('niveau', this.formR.value.niveau);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (this.selectedDocument) {
      formData.append('document', this.selectedDocument);
    }

    this.coursservice.addCours(formData).subscribe(() => {
      console.log('Cours ajouté avec image et document');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cours/cours']);
      });
    });
  }


}
