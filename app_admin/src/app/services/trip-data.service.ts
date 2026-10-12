
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiUrl = '/api/trips';

  constructor(private http: HttpClient) {}

  // GET: Retrieve all trips
  getTrips(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // GET: Retrieve a specific trip
  getTrip(tripCode: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${tripCode}`
    );
  }

  // POST: Add a new trip
  addTrip(trip: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, trip);
  }

  // PUT: Update an existing trip
  updateTrip(tripCode: string, trip: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${tripCode}`,
      trip
    );
  }

  // DELETE: Remove a trip
  deleteTrip(tripCode: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${tripCode}`
    );
  }
}
