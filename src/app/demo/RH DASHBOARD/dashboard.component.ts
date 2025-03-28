import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApplicationControllerService } from '../../servicesahmed/services/application-controller.service';
import { Application } from '../../servicesahmed/models/application';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Offre } from "../../servicesahmed/models/offre";
import { OffreControllerService } from "../../servicesahmed/services/offre-controller.service";

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadApplications();
    console.log(this.applications);
  }

  // Load applications from the service
  private loadApplications(): void {
    this.isLoading = true;
    this.errorMessage = '';  // Reset error message on new request

    this.applicationService.getApplications().subscribe({
      next: (data: Application[]) => {
        this.applications = data;
        console.log('Fetched applications:', data);  // Debug here
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

  onSubmit() {
    // Handle the submit form logic here
    this.saveoffre();
  }

  // Save offre and handle the response
  saveoffre() {
    console.log("Add Offre:", this.offre);

    this.offreservice.addoffre({
      body: this.offre
    }).subscribe({
      next: (response) => {
        alert("Offre added successfully!");
        console.log("Offre added successfully:", response);
      },
      error: (error) => {
        // Log detailed error
        console.error('Error adding offre:', error);
        // Check the error status to give better feedback
        if (error.status === 0) {
          alert('Network error or server unreachable. Please check your network or server.');
        } else {
          alert('Failed to add offre. Please try again.');
        }
      }
    });
  }

}
