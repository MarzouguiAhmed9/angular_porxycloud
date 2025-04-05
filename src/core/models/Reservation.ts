export class Reservation {
    idReservation?: number;
    nombrePlaces?: number;
    dateReservation?: Date;
    statutPaiement?: string;
    montantTotal?: number;
    seatNumbers?: any[]; 
    event?: any;
  
    constructor() {
      // Initialize properties if necessary
    }
  }