import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  

  events: any[] = [];  

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEventsWithSponsors().subscribe(
      (data) => {
        console.log('Events with sponsors:', data); // Inspectez les données
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
  
  // Méthode pour vérifier si un événement a des sponsors
  hasSponsors(event: any): boolean {
    return event.sponsors && event.sponsors.length > 0;
  }

  loadEvents(): void {
    this.eventService.getEventsWithSponsors().subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  deleteEvent(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.events = this.events.filter(event => event.idEvent !== id);
      });
    }
  }

  getSponsorNames(sponsors: any[]): string {
    if (!sponsors || sponsors.length === 0) return 'Aucun sponsor';
    return sponsors.map(s => s.nomSponsor).join(', ');
  }
}