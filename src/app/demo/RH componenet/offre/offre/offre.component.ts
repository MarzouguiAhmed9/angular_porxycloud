import { Component, OnInit } from '@angular/core';
import { OffreControllerService } from "../../../../servicesahmed/services/offre-controller.service";
import { Offre } from "../../../../servicesahmed/models/offre";
import { TokenService } from "../../../../servicesahmed/token/token.service";

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss'],
  standalone: false
})
export class OffreComponent implements OnInit {
  applications: Offre[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  offre: Offre = { skills: '', description: '', title: '' };
  isEditing: boolean = false;  // For handling view/edit/add mode
  selectedOffreId: number | null = null;
  username: string | null = null;  // Store the username

  constructor(
    private offreservice: OffreControllerService,
    private tokenService: TokenService // Inject TokenService to get the token
  ) {}

  ngOnInit(): void {
    this.loadApplications();  // Load applications initially

    const token = this.tokenService.getToken();  // Get token from service
    if (token) {
      // Decode the token and extract the username
      const decoded = this.decodeJwt(token);
      this.username = decoded?.sub;  // Assuming 'sub' is the username field in the token
      console.log(this.username);
    }
  }

  private loadApplications(): void {
    this.isLoading = true;
    this.offreservice.getAllOffres().subscribe({
      next: (data: Offre[]) => {
        this.applications = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load offres.';
        this.isLoading = false;
      }
    });
  }

  // Method to load offer data when clicking "View"
  viewOffre(offree: Offre): void {
    this.offre = { ...offree };
    this.isEditing = false;  // View mode (readonly fields)
  }

  // Method to edit an offer
  editOffre(offree: Offre): void {
    this.offre = { ...offree };
    this.selectedOffreId = offree.id;
    this.isEditing = true;  // Edit mode (editable fields)
  }

  private decodeJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  // Method to switch to add mode (reset form fields)
  addOffre(): void {
    this.offre = { skills: '', description: '', title: '' };
    this.isEditing = true;  // Add mode (editable fields)
    this.selectedOffreId = null;  // No ID since it's a new offer
  }

  onSubmit(): void {
    if (this.isEditing && this.selectedOffreId) {
      this.updateOffre(this.selectedOffreId, this.offre);
    } else {
      this.saveOffre();
    }
  }

  saveOffre(): void {
    this.isLoading = true;

    const token = this.tokenService.getToken();
    if (token) {
      const decodedToken = this.decodeJwt(token);
      const username = decodedToken.sub; // or decodedToken.username if your token uses another field

      // Attach username to the offer
      (this.offre as any).rh = username;
    }

    this.offreservice.addOffre({ body: this.offre }).subscribe({
      next: () => {
        alert('Offre added successfully!');
        this.resetForm();
        this.loadApplications();
      },
      error: () => {
        this.isLoading = false;
        alert('Failed to add offre. Please try again.');
      }
    });
  }


  updateOffre(id: number, updatedOffre: Offre): void {
    this.isLoading = true;
    this.offreservice.editOffre({ id, body: updatedOffre }).subscribe({
      next: () => {
        alert('Offre updated successfully!');
        this.resetForm();
        this.loadApplications();  // Reload the applications after editing
      },
      error: (error) => {
        this.isLoading = false;
        alert('Failed to update offre. Please try again.');
      }
    });
  }

  private resetForm(): void {
    this.offre = { skills: '', description: '', title: '' };
    this.isEditing = false;
    this.selectedOffreId = null;
  }

  deleteOffre(id: number): void {
    this.isLoading = true;
    this.offreservice.deleteOffre({ id }).subscribe({
      next: () => {
        alert('Offre deleted successfully!');
        this.loadApplications();  // Reload the applications after deletion
      },
      error: (error) => {
        this.isLoading = false;
        alert('Failed to delete offre. Please try again.');
      }
    });
  }
}
