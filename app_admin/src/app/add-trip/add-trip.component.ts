
import { Component, EventEmitter, Output } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {

  @Output() tripAdded = new EventEmitter<void>();

  trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  errorMessage = '';
  successMessage = '';
  isSaving = false;

  constructor(private tripDataService: TripDataService) {}

  addTrip(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSaving = true;

    this.tripDataService.addTrip(this.trip).subscribe({
      next: () => {
        this.successMessage = 'Trip added successfully!';
        this.isSaving = false;

        this.tripAdded.emit();

        this.trip = {
          code: '',
          name: '',
          length: '',
          start: '',
          resort: '',
          perPerson: '',
          image: '',
          description: ''
        };
      },
      error: (error) => {
        console.error('Error adding trip:', error);
        this.errorMessage = 'Unable to add trip. Please try again.';
        this.isSaving = false;
      }
    });
  }
}
