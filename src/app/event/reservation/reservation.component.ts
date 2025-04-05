import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from 'src/core/models/Reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  event: any;
  takenSeats: number[] = [];
  selectedSeats: number[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['id'];
    this.loadEventDetails(eventId);
    this.loadTakenSeats(eventId);
  }

  loadEventDetails(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe(event => {
      this.event = event;
    });
  }

  loadTakenSeats(eventId: number): void {
    this.reservationService.getReservationsForEvent(eventId).subscribe((reservations: Reservation[]) => {
      this.takenSeats = reservations.flatMap((r: Reservation) => r.seatNumbers);
    });
  }

  onSeatsSelected(seats: number[]): void {
    this.selectedSeats = seats;
  }

  confirmReservation(): void {
    if (this.selectedSeats.length > 0) {
      this.reservationService.createReservation(this.event.idEvent, this.selectedSeats).subscribe({
        next: () => this.router.navigate(['/lists']),
        error: (err) => console.error('Reservation failed', err)
      });
    }
  }
}