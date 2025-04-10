// import { User } from './user.model';
import { StudyPlan } from "./study-plan.model";

export class University {
  universityId!: number;
  name!: string;
  description!: string;
  programSpecialty!: string;
  establishedYear!: number;
  address!: string;
  city!: string;
  state!: string;
  country!: string;
  postalCode!: string;
  website!: string;
  phoneNumber!: string;
  email!: string;
  type!: string;
  accreditationStatus!: string;
  logo!: string;
  thumbnail!: string;
  ranking!: number;
  studyPlans!: StudyPlan[];
  // users!: User[];
}
