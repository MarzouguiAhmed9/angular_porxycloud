export interface Review {
  idReview?: number;
  rating: number;
  commentaire: string;
  dateReview: Date | string;
  event?: any;
}