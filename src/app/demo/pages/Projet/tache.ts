import { User } from "src/app/serviceUser/user.service";
import { Projet } from "./projet";


export interface Tache {
  idTache: number;
  nomTache: string;
  dateDebut: string;
  dateFin: string;
  projet?: Projet;
  utilisateur?: User;
  status: string;
}
