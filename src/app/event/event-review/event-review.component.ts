import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from 'src/core/models/Review';
import { ReviewService } from '../services/review.service';
import { myEvent } from 'src/core/models/event';

@Component({
  selector: 'app-event-review',
  templateUrl: './event-review.component.html',
  styleUrls: ['./event-review.component.css']
})
export class EventReviewComponent  implements OnInit {
  @Input() idEvent: number | null = null;
  @Output() reviewAdded = new EventEmitter<void>();
  reviewForm: FormGroup;
  stars = [1, 2, 3, 4, 5];
  selectedRating = 0;
  event: myEvent = new myEvent();
  

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.fb.group({
      commentaire: ['', [Validators.required, Validators.maxLength(500)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {}

  setRating(rating: number): void {
    this.selectedRating = rating;
    this.reviewForm.patchValue({ rating });
  }

  // In event-review.component.ts
onSubmit(): void {
  if (this.reviewForm.valid && this.idEvent) {
    const reviewData = {
      rating: this.reviewForm.value.rating,
      commentaire: this.reviewForm.value.commentaire,
      event: { idEvent: this.idEvent },
      dateReview: new Date().toISOString()
    };

    this.reviewService.addReview(reviewData).subscribe({
      next: (savedReview) => {
        console.log('Review added:', savedReview);
        this.reviewForm.reset();
        this.selectedRating = 0;
        this.reviewAdded.emit(); // This triggers the parent to refresh
      },
      error: (err) => console.error('Error submitting review:', err)
    });
  }
}
}