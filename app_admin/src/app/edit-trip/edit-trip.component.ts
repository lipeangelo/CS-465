
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnChanges {

  @Input() trip: any;
  @Output() tripUpdated = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  editedTrip: any = {};
  errorMessage = '';
  successMessage = '';
  isSaving = false;

  constructor(private tripDataService: TripDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trip'] && this.trip) {
      this.editedTrip = { ...this.trip };

      if (this.editedTrip.start) {
        this.editedTrip.start = this.editedTrip.start.substring(0, 10);
      }

      this.errorMessage = '';
      this.successMessage = '';
    }
  }

  updateTrip(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSaving = true;

    this.tripDataService.updateTrip(
      this.trip.code,
      this.editedTrip
    ).subscribe({
      next: () => {
        this.successMessage = 'Trip updated successfully!';
        this.isSaving = false;
        this.tripUpdated.emit();
      },
      error: (error) => {
        console.error('Error updating trip:', error);
        this.errorMessage = 'Unable to update trip. Please try again.';
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.cancelEdit.emit();
  }
}
