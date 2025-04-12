import { Component, OnInit } from '@angular/core';
import { Application } from "../../../servicesahmed/models/application";
import { Offre } from "../../../servicesahmed/models/offre";
import { ApplicationControllerService } from "../../../servicesahmed/services/application-controller.service";
import { OffreControllerService } from "../../../servicesahmed/services/offre-controller.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { TokenService } from "../../../servicesahmed/token/token.service";

@Component({
  standalone : false,
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  applications: Application[] = [];
  offres: Offre[] = [];  // To store the list of offres
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
    // Load applications
    this.loadApplications();
    // Load offres
    this.loadOffres();


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

  onSubmit() {
    // Handle form submission
    this.saveOffre();
  }

  saveOffre() {
    console.log("Adding Offre:", this.offre);
    this.isLoading = true;

    this.offreservice.addOffre({ body: this.offre }).subscribe({
      next: (response) => {
        alert("Offre added successfully!");
        console.log("Offre added successfully:", response);
        this.resetForm();
        this.loadOffres();  // Reload the list of offres
      },
      error: (error) => {
        console.error('Error adding offre:', error);
        this.isLoading = false;
        if (error.status === 0) {
          alert('Network error or server unreachable. Please check your network or server.');
        } else {
          alert('Failed to add offre. Please try again.');
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private resetForm() {
    this.offre = {
      title: '',
      skills: '',
      description: ''
    };
  }
}
