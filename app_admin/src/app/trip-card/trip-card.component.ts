import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {

  // Trip data provided by the parent dashboard.
  @Input() trip: any;

  // Events used to communicate with the parent component.
  @Output() editTrip = new EventEmitter<any>();
  @Output() deleteTrip = new EventEmitter<any>();

  // Request editing of the selected trip.
  onEdit(): void {
    this.editTrip.emit(this.trip);
  }

  // Confirm deletion before notifying the parent component.
  onDelete(): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${this.trip.name}"?`
    );

    if (confirmed) {
      this.deleteTrip.emit(this.trip);
    }
  }
}
