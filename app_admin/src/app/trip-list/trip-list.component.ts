import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  // Stores trips retrieved from the database.
  trips: any[] = [];

  // Stores the trip currently being edited.
  selectedTrip: any = null;

  // Displays errors to the administrator.
  errorMessage = '';

  constructor(private tripDataService: TripDataService) {}

  // Load trips when the component initializes.
  ngOnInit(): void {
    this.loadTrips();
  }

  // GET: Retrieve all trips from the API.
  loadTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading trips:', error);
        this.errorMessage = 'Unable to load trips.';
      }
    });
  }

  // Open the Edit Trip form.
  editTrip(trip: any): void {
    this.selectedTrip = trip;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Close the Edit Trip form without saving.
  cancelEdit(): void {
    this.selectedTrip = null;
  }

  // Refresh the dashboard after editing a trip.
  onTripUpdated(): void {
    this.selectedTrip = null;
    this.loadTrips();
  }

  // DELETE: Remove the selected trip using its unique code.
  // The Trip Card component handles the confirmation prompt.
  deleteTrip(trip: any): void {

    // Validate the trip before sending the DELETE request.
    if (!trip || !trip.code) {
      this.errorMessage = 'Cannot delete a trip without a valid code.';
      return;
    }

    // Send the DELETE request to the protected Express API.
    // The Angular HTTP interceptor attaches the JWT.
    this.tripDataService.deleteTrip(trip.code).subscribe({
      next: () => {

        // Close the edit form if the deleted trip was selected.
        if (this.selectedTrip?.code === trip.code) {
          this.selectedTrip = null;
        }

        // Reload trips to reflect the database changes.
        this.loadTrips();
      },
      error: (error) => {
        console.error('Error deleting trip:', error);

        if (error.status === 401 || error.status === 403) {
          this.errorMessage =
            'Your session is unauthorized or has expired. Please log in again.';
        } else {
          this.errorMessage =
            'Unable to delete the trip. Please try again.';
        }
      }
    });
  }
}
