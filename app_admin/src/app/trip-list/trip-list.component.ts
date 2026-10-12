
import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  trips: any[] = [];
  selectedTrip: any = null;
  errorMessage = '';

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

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

  editTrip(trip: any): void {
    this.selectedTrip = trip;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.selectedTrip = null;
  }

  onTripUpdated(): void {
    this.selectedTrip = null;
    this.loadTrips();
  }
}
