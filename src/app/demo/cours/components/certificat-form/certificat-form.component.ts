import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CertificatService } from '../../services/certificat.service';
import { Router } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificat-form',
  imports: [CardComponent ,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './certificat-form.component.html',
  styleUrl: './certificat-form.component.scss'
})
export class CertificatFormComponent implements OnInit{

  formR!:FormGroup;
  constructor(private certificatService:CertificatService,private router:Router){
        
      }


  ngOnInit(): void {
    this.formR = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      instructeur: new FormControl('', [Validators.required, Validators.minLength(2)]),
      validite: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
        Validators.max(48)
      ]),
      niveau: new FormControl('', [
        Validators.required,
        Validators.pattern("^(BASIQUE|INTERMEDIAIRE|AVANCE)$")
      ]),
    });
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
