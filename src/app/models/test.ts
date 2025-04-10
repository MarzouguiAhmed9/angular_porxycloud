import { SafeResourceUrl } from '@angular/platform-browser';
export class Test {
    id:number | undefined;
    description:string | undefined;
    score:string | undefined;

    questions: string[] = [];
    choices: string[] = []; // tous les choix regroupés en une seule liste
    correctAnswers: number[] = [];

}
