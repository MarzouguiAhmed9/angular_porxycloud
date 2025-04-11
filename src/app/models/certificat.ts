import { SafeResourceUrl } from '@angular/platform-browser';
import { Test } from './test';

// Créez une enum pour le niveau (si possible)
export enum NiveauCertificat {
    DEBUTANT = 'BASIQUE',
    INTERMEDIAIRE = 'INTERMEDIAIRE',
    AVANCE = 'AVANCE'
  }

export class Certificat {
    id:number | undefined;
    nom:string | undefined;
    instructeur:string | undefined;
    validite:number | undefined;
    statut:number | undefined;
    niveau:NiveauCertificat | undefined;


}