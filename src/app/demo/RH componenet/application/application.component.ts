import { Component, OnInit } from '@angular/core';
import { Application } from "../../../servicesahmed/models/application";
import { Offre } from "../../../servicesahmed/models/offre";
import { ApplicationControllerService } from "../../../servicesahmed/services/application-controller.service";
import { OffreControllerService } from "../../../servicesahmed/services/offre-controller.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { TokenService } from "../../../servicesahmed/token/token.service";
import { Feedback } from "../../../servicesahmed/models/feedback";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  standalone: false,
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  applications: Application[] = [];
  offres: Offre[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  selectedCvUrl: SafeResourceUrl = null;

  offre: Offre = {
    title: '',
    skills: '',
    description: ''
  };

  constructor(
    private applicationService: ApplicationControllerService,
    private offreservice: OffreControllerService,
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadApplications();
    this.loadOffres();
  }

  private loadApplications(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.applicationService.getApplications().subscribe({
      next: (data: Application[]) => {
        this.applications = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load applications. Please try again later.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private loadOffres(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.offreservice.getAllOffres().subscribe({
      next: (data: Offre[]) => {
        this.offres = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load offres. Please try again later.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Calculate score based on CV and offer skills
  calculateScore(cvSkills: string[], offerSkills: string[]): number {
    // Trim spaces from both CV skills and offer skills before comparing
    const trimmedCvSkills = cvSkills.map(skill => skill.trim());
    const trimmedOfferSkills = offerSkills.map(skill => skill.trim());

    // Log the trimmed skills for debugging
    console.log('Trimmed CV Skills:', trimmedCvSkills);
    console.log('Trimmed Offer Skills:', trimmedOfferSkills);

    // Calculate the number of matched skills
    const matchedSkills = trimmedCvSkills.filter(skill => trimmedOfferSkills.includes(skill));

    // Log the matched skills
    console.log('Matched Skills:', matchedSkills);

    // Set the score based on matching skills
    let score = (matchedSkills.length / trimmedOfferSkills.length) * 100;

    // Apply normalization to decrease the score for fewer matches
    if (matchedSkills.length === 1) {
      score = score * 0.5; // Decrease the score by half for only one match
    } else if (matchedSkills.length === 0) {
      score = 0; // If no match, set the score to 0
    }

    // Ensure the score doesn't exceed 100%
    return Math.min(score, 100);
  }



  // Method to view the CV as a PDF
  viewCv(cvId: number): void {
    const url = `http://localhost:8089/Projetback/cv/view/${cvId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const fileURL = URL.createObjectURL(response);
        this.selectedCvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
      },
      (error) => {
        this.selectedCvUrl = null;
      }
    );
  }

  // Optional: Method to close the CV preview
  closeCv(): void {
    this.selectedCvUrl = null;
  }
  setFeedbackRating(application: Application, star: number): void {
    if (application.feedback) {
      application.feedback.note = star; // Update the local feedback note

      // Optionally, send the updated feedback to the backend here
      this.applicationService.updateFeedback(application.feedback).subscribe({
        next: () => {
          console.log('Feedback rating updated successfully');
        },
        error: (err) => {
          console.error('Error updating feedback:', err);
        }
      });
    }
  }

  // Method to calculate and update the circle color dynamically
  updateScoreAndColor(application: Application, offre: Offre): void {
    const cvSkills = application.cv.skills.split(','); // assuming skills are stored as a comma-separated string
    const offerSkills = offre.skills.split(',');
    const score = this.calculateScore(cvSkills, offerSkills);
    const circle = document.querySelector(`#circle-${application.id}`);
    console.log(cvSkills, offerSkills, score);
    console.log("rrr" + offerSkills)


    // Update the circle's color based on the score
    circle?.setAttribute('data-score', score.toString());
    console.log("Score calculated and circle updated with score:", score);

    console.log("Score calculated and circle updated with score:", score);
  }

}
