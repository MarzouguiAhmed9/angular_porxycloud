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
  bestApplicant: Application | null = null;  // Variable to store the best applicant
  bestApplicantScore: number = 0;  // Variable to store the highest score

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
        this.calculateBestApplicant(); // Calculate the best applicant after loading the applications
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
    const trimmedCvSkills = cvSkills.map(skill => skill.trim());
    const trimmedOfferSkills = offerSkills.map(skill => skill.trim());
    const matchedSkills = trimmedCvSkills.filter(skill => trimmedOfferSkills.includes(skill));
    let score = (matchedSkills.length / trimmedOfferSkills.length) * 100;

    if (matchedSkills.length === 1) {
      score = score * 0.5; // Decrease the score by half for only one match
    } else if (matchedSkills.length === 0) {
      score = 0; // If no match, set the score to 0
    }

    return Math.min(score, 100);
  }

  // Calculate the best applicant based on the highest score
  calculateBestApplicant(): void {
    let highestScore = 0;
    let bestApplication: Application | null = null;

    // Iterate through the applications and calculate score for each
    this.applications.forEach(application => {
      if (application.cv && this.offres[0]) {
        const cvSkills = application.cv.skills.split(',');
        const offerSkills = this.offres[0].skills.split(',');
        const score = this.calculateScore(cvSkills, offerSkills);

        // Check if this application has the highest score
        if (score > highestScore) {
          highestScore = score;
          bestApplication = application;
        }
      }
    });

    // Set the best applicant and score
    if (bestApplication) {
      this.bestApplicant = bestApplication;
      this.bestApplicantScore = highestScore;
    }
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
      application.feedback.note = star;

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
}
