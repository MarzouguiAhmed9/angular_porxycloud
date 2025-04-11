import { Component } from '@angular/core';
import { CertificatFormComponent } from '../certificat-form/certificat-form.component';
import { CertificatTableComponent } from '../certificat-table/certificat-table.component';
import { AffectCertificatCoursComponent } from '../affect-certificat-cours/affect-certificat-cours.component';

@Component({
  selector: 'app-certificat',
  imports: [CertificatFormComponent,CertificatTableComponent,AffectCertificatCoursComponent],
  templateUrl: './certificat.component.html',
  styleUrl: './certificat.component.scss'
})
export class CertificatComponent {

}
