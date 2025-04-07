import { Feedback } from "./feedback";
import { Cv } from "./cv";

export interface Application {
  createdBy?: number;
  cv?: Cv;
  feedback?: Feedback;
  id?: number;
  motivatedlettre?: string;
  status?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  studentId?: number;
  pdfDownloadLink?: string; // <-- manually added
}
