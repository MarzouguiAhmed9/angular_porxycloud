import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/core/Sponsor';
import { ServicesponsorsService } from '../servicesponsors.service';

@Component({
  selector: 'app-sponsorslist',
  templateUrl: './sponsorslist.component.html',
  styleUrls: ['./sponsorslist.component.css']
})
export class SponsorslistComponent implements OnInit {

  sponsors: Sponsor[] = [];  

  constructor(private sponsorService: ServicesponsorsService) { }

  ngOnInit(): void {
    this.loadSponsors();
  }

  loadSponsors(): void {
    this.sponsorService.getSponsors().subscribe(
      (data) => {
        this.sponsors = data;
      },
      (error) => {
        console.error('Error fetching sponsors:', error);
      }
    );
  }

  deleteSponsor(id: number | undefined): void {
    if (id && confirm('Voulez-vous vraiment supprimer ce sponsor ?')) {
      this.sponsorService.deleteSponsor(id).subscribe(() => {
        this.sponsors = this.sponsors.filter(sponsor => sponsor.idSponsor !== id);
      });
    }
  }
}