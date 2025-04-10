import { SafeResourceUrl } from '@angular/platform-browser';
import { Test } from './test';

// Créez une enum pour le niveau (si possible)
export enum NiveauCours {
    DEBUTANT = 'DEBUTANT',
    INTERMEDIAIRE = 'INTERMEDIAIRE',
    AVANCE = 'AVANCE'
  }

export class Cours {
    id:number | undefined;
    titre:string | undefined;
    description:string | undefined;
    auteur:string | undefined;
    categorie:string | undefined;
    langue:string | undefined;
    duree:number | undefined;
    niveau:NiveauCours | undefined;
    prix:number | undefined;
    imageUrl: string | undefined; // Ajout de l'attribut image
    documentUrl:string | undefined; // Ajout de l'attribut document
    safeDocumentUrl?: SafeResourceUrl;  //pour voir le pdf dans la meme page 

    test:Test|undefined;

}