import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { CertificatService } from '../../services/certificat.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Certificat } from 'src/app/models/certificat';

@Component({
  selector: 'app-update-certificat',
  imports: [CardComponent ,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './update-certificat.component.html',
  styleUrl: './update-certificat.component.scss'
})
export class UpdateCertificatComponent implements OnInit {

  formR!:FormGroup;
  idupadate!:number;
  listupdatecertificat:Certificat=new Certificat;
    constructor(private act:ActivatedRoute,private certificatService:CertificatService,private router:Router){
          
        }
  
  
    ngOnInit(): void {
      this.idupadate=this.act.snapshot.params['id']

        this.formR = new FormGroup({
          id:new FormControl('',),
          nom:new FormControl('',),
          instructeur:new FormControl('',),
          validite:new FormControl('',),
          statut:new FormControl('',),
          niveau:new FormControl('',),
   
        })
        this.certificatService.getCertificat(this.idupadate).subscribe((data)=>{
          this.listupdatecertificat=data
          console.log(this.listupdatecertificat)
  
        this.formR.patchValue(this.listupdatecertificat as any)
      })
      }
  
      get id(){
        return this.formR.get('id')
      }
      get nom(){
        return this.formR.get('nom')
      }
      get instructeur(){
        return this.formR.get('instructeur')
      }
      get validite(){
        return this.formR.get('validite')
      }
      get statut(){
        return this.formR.get('statut')
      }
      get niveau(){
        return this.formR.get('niveau')
      }

      update(){
        this.certificatService.updateCertificat(this.formR.value).subscribe(() => {
        console.log('certificat ajouté avec succès');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cours/certificat']);
        });
      });
    }



}
