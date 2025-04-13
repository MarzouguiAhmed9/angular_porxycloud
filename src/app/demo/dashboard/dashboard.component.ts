



import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/serviceUser/user.service';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  statistics: any;

  constructor(private userService: UserService, private router:Router) {}

  ngOnInit(): void {
    this.getUserStatistics();
  }

  getUserStatistics(): void {
    this.userService.getUserStatistics().subscribe(
      data => {
        this.statistics = data;
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques', error);
      }
    );
  }


  logout() {
    this.router.navigate(['/logout']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  list() {
    this.router.navigate(['/list']);
  }
  list2() {
    this.router.navigate(['/projet']);
  }
  
}
