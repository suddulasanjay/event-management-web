export interface EventDTO {
  eventId: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  isPublished: boolean;
  price: number;
}
