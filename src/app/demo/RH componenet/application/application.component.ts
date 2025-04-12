import { Component, OnInit } from '@angular/core';
import { Application } from "../../../servicesahmed/models/application";
import { Offre } from "../../../servicesahmed/models/offre";
import { ApplicationControllerService } from "../../../servicesahmed/services/application-controller.service";
import { OffreControllerService } from "../../../servicesahmed/services/offre-controller.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { TokenService } from "../../../servicesahmed/token/token.service";
import { Feedback } from "../../../servicesahmed/models/feedback"; // Assuming you have this model

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
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    // Load applications and offres
    this.loadApplications();
    this.loadOffres();
    console.log(this.applications);
  }

  private loadApplications(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.applicationService.getApplications().subscribe({
      next: (data: Application[]) => {
        this.applications = data;
        console.log('Fetched applications:', this.applications);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load applications. Please try again later.';
        console.error('Error fetching applications:', error);
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
        console.log('Fetched offres:', this.offres);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load offres. Please try again later.';
        console.error('Error fetching offres:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  setFeedbackRating(application: Application, star: number) {
    if (application.feedback) {
      application.feedback.note = star; // Update the local feedback object

      // Send the updated feedback to the backend
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


  private updateFeedback(application: Application): void {
    // Assuming your API endpoint is available for updating the feedback
    this.applicationService.updateApplicationFeedback(application.id, application.feedback)
      .subscribe({
        next: (response) => {
          console.log('Feedback updated successfully', response);
        },
        error: (error) => {
          console.error('Error updating feedback:', error);
        }
      });
  }

  // Optional: Reset form (if required)
  private resetForm() {
    this.offre = {
      title: '',
      skills: '',
      description: ''
    };
  }
}
