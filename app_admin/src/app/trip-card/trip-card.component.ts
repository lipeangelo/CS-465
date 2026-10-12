
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {

  @Input() trip: any;

  @Output() editTrip = new EventEmitter<any>();

  onEdit(): void {
    this.editTrip.emit(this.trip);
  }
}
