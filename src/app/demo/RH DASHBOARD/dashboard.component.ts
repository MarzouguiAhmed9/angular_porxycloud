import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApplicationControllerService } from '../../servicesahmed/services/application-controller.service';
import { Application } from '../../servicesahmed/models/application';
import { Offre } from "../../servicesahmed/models/offre";
import { OffreControllerService } from "../../servicesahmed/services/offre-controller.service";
import { SharedModule } from "../../theme/shared/shared.module";
import { HttpClient } from '@angular/common/http';
import { TokenService } from "../../servicesahmed/token/token.service"; // Add HttpClient for testing interceptor

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  applications: Application[] = [];
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
  private tokenService: TokenService// Inject HttpClient to test the interceptor
  ) {}

  ngOnInit(): void {
    // Load applications (as before)
    this.loadApplications();
    const token = this.tokenService.getToken();
    console.log('Token:', token);  // Should log the token if it exists

    // Check if the user is already authenticated
    if (this.tokenService.hasToken()) {
      console.log('User is authenticated');
    } else {
      console.log('User is not authenticated');
    }
    // Test the interceptor by making a simple HTTP GET request
    this.testInterceptor();
  }

  private loadApplications(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.applicationService.getApplications().subscribe({
      next: (data: Application[]) => {
        this.applications = data;
        console.log('Fetched applications:', data);
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

  private testInterceptor() {
    // Make a dummy HTTP GET request to test the interceptor
    this.http.get('/some-endpoint').subscribe({
      next: (data) => {
        console.log('Test request successful:', data);
      },
      error: (error) => {
        console.error('Test request error:', error);
      }
    });
  }

  onSubmit() {
    // Handle form submission
    this.saveoffre();
  }

  saveoffre() {
    console.log("Adding Offre:", this.offre);
    this.isLoading = true;

    this.offreservice.addoffre({ body: this.offre }).subscribe({
      next: (response) => {
        alert("Offre added successfully!");
        console.log("Offre added successfully:", response);
        this.resetForm();
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
