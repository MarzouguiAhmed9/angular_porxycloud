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
export class DashboardComponent  {

}
