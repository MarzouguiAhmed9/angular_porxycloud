import { Component, OnInit } from '@angular/core';
import { myEvent } from 'src/core/models/event';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-front',
  templateUrl: './events-front.component.html',
  styleUrls: ['./events-front.component.css']
})
export class EventsFrontComponent implements OnInit {
  events: myEvent[] = [];

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEventsForFront().subscribe({
      next: (events) => this.events = events,
      error: (err) => console.error('Error loading events:', err)
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/event-details', id]);
  }
}