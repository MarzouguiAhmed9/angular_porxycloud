import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent {
  @Input() maxCapacity: number = 0;
  @Input() takenSeats: number[] = [];
  @Output() seatsSelected = new EventEmitter<number[]>();
  
  selectedSeats: number[] = [];
  rows: number = 0;
  cols: number = 10; // 10 sièges par rangée

  ngOnChanges() {
    this.rows = Math.ceil(this.maxCapacity / this.cols);
  }

  toggleSeat(seatNumber: number) {
    const index = this.selectedSeats.indexOf(seatNumber);
    if (index === -1) {
      this.selectedSeats.push(seatNumber);
    } else {
      this.selectedSeats.splice(index, 1);
    }
    this.seatsSelected.emit(this.selectedSeats);
  }

  isSeatTaken(seatNumber: number): boolean {
    return this.takenSeats.includes(seatNumber);
  }

  isSeatSelected(seatNumber: number): boolean {
    return this.selectedSeats.includes(seatNumber);
  }
}