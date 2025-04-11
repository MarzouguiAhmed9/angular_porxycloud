import { User } from "src/app/serviceUser/user.service";
import { Tache } from "./tache";

export interface Projet {
  idProjet: number;
  nomProjet: string;
  description: string;
  nbreGestions: number;
  nbreMembreDisponible: number;
  dateDebut: string;
  dateFin: string;
  createurNom: string;
  membres?: User[];
  taches?: Tache[];
  status: string;
}
