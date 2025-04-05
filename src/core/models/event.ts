import { Sponsor } from "../Sponsor";
import { Reservation } from "./Reservation";
import { Review } from "./Review";

export class myEvent {
  idEvent?: number;         // Maps Long idEvent in Java to number in TypeScript
  nomEvent?: string;        // Maps String nomEvent in Java
  descriptionEvent?: string;
  imageEvent?: string; // Maps String descriptionEvent in Java
  dateDebut?: Date;         // Maps Date dateDebut in Java
  dateFin?: Date;           // Maps Date dateFin in Java
  lieu?: string;            // Maps String lieu in Java
  capaciteMax?: number;     // Maps int capaciteMax in Java
  prix?: number;            // Maps double prix in Java
  statut?: string;          // Maps String statut in Java
  typeEvenement?: string;   // Maps String typeEvenement in Java
  
  sponsors?: Sponsor[];     // Maps Set<Sponsor> sponsors in Java to an array of Sponsor objects in TypeScript
  reservations?: Reservation[]; // Maps Set<Reservation> reservations in Java to an array of Reservation objects in TypeScript
  reviews?: Review[]; 
  // Maps Set<Review> reviews in Java to an array of Review objects in TypeScript

  constructor() {
    // Optional initialization of properties if needed
  }
}