// event-bus.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppEvent, WebinarTypes } from '../models/webinar.model';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private eventBus = new Subject<AppEvent>();

  // Emit an event
  emit(event: AppEvent) {
    this.eventBus.next(event);
  }

  // Listen to specific event type
  on(eventType: WebinarTypes): Observable<any> {
    return this.eventBus.pipe(
      filter((event) => event.type === eventType),
      map((event) => event.payload)
    );
  }

  // Listen to all events
  onAll(): Observable<AppEvent> {
    return this.eventBus.asObservable();
  }
}
