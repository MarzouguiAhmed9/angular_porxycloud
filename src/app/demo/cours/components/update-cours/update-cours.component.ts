import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cours } from 'src/app/models/cours';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { CoursService } from '../../services/cours.service';

@Component({
  selector: 'app-update-cours',
  imports: [CardComponent ,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './update-cours.component.html',
  styleUrl: './update-cours.component.scss'
})
export class UpdateCoursComponent implements OnInit{

  idupadate!:number;
  formR!:FormGroup;
  listupdatecours:Cours=new Cours;
  selectedImage: File | null = null; // Stocke l'image sélectionnée
  selectedDocument: File | null = null;
  
  constructor(private act:ActivatedRoute,private coursservice:CoursService,private router:Router){
      
    }
        
   ngOnInit(): void {

    this.idupadate=this.act.snapshot.params['id']
    
      this.formR = new FormGroup({
        id:new FormControl('',),
        titre:new FormControl('',),
        description:new FormControl('',),
        auteur:new FormControl('',),
        categorie:new FormControl('',),
        langue:new FormControl('',),
        duree:new FormControl('',),
        prix:new FormControl('',),
        niveau:new FormControl('',), 
        image:new FormControl('',), // Ajout de l'attribut image
        document:new FormControl('',) // Ajout de l'attribut document   
  
      })
      this.coursservice.getCours(this.idupadate).subscribe((data)=>{
        this.listupdatecours=data
        console.log(this.listupdatecours)

      this.formR.patchValue(this.listupdatecours as any)
    })
    }

    get id(){
      return this.formR.get('id')
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
  update() {
    const formData = new FormData();
    formData.append('id', this.formR.value.id);
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

    this.coursservice.updateCours(formData).subscribe(() => {
      console.log('Cours ajouté avec image et document');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cours/cours']);
      });
    });
  }

}
