import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificatService } from '../../services/certificat.service';
import { Router } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-certificat-form',
  imports: [CardComponent ,FormsModule,ReactiveFormsModule],
  templateUrl: './certificat-form.component.html',
  styleUrl: './certificat-form.component.scss'
})
export class CertificatFormComponent implements OnInit{

  formR!:FormGroup;
  constructor(private certificatService:CertificatService,private router:Router){
        
      }


  ngOnInit(): void {
      this.formR = new FormGroup({
        nom:new FormControl('',),
        instructeur:new FormControl('',),
        validite:new FormControl('',),
        statut:new FormControl('',),
        niveau:new FormControl('',),
 
      })
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

    add(){
      this.certificatService.addCertificat(this.formR.value).subscribe(() => {
        console.log('certificat ajouté avec succès');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cours/certificat']);
        });
      });
    }
    

}
