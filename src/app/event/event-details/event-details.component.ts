import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myEvent } from 'src/core/models/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: myEvent | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadEventDetails(Number(id));
  }

  get eventId(): number | null {
    return this.event?.idEvent || null;
  }

  loadEventDetails(id: number | null | undefined): void {
    if (!id) return;
    
    this.isLoading = true;
    this.error = null;
    
    this.eventService.getEventWithReviews(id).subscribe({
      next: (event) => {
        this.event = event;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading event:', err);
        this.error = 'Failed to load event details';
        this.isLoading = false;
      }
    });
  }

  onReviewAdded(): void {
    if (this.eventId) {
      this.loadEventDetails(this.eventId);
    }
  }
  goBackToEvents(): void {
    window.history.back();
  }
}