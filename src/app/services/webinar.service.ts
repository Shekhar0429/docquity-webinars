import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Speaker, Webinar } from '../models/webinar.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebinarService {
  private webinars: Webinar[] = [];

  constructor(private http: HttpClient) {}

  getWebinars(): Observable<Webinar[]> {
    return this.http.get<Webinar[]>('/assets/JSONS/webinars.json');
  }

  getTopSpeakers(): Observable<Speaker[]> {
    return this.http.get<Speaker[]>('/assets/JSONS/top-speakers.json');
  }
  getWebinarsByType(type: string): Observable<Webinar[]> {
    if (type === 'All') {
      return of(this.webinars);
    }
    const filtered = this.webinars.filter((w) => w.type === type.toUpperCase());
    return of(filtered);
  }
}
