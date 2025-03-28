import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApplicationControllerService } from '../../servicesahmed/services/application-controller.service';
import { Application } from '../../servicesahmed/models/application';
import { SharedModule } from 'src/app/theme/shared/shared.module';

declare const AmCharts;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';

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

  constructor(
    private applicationService: ApplicationControllerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadApplications();
    console.log(this.applications)
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
}
