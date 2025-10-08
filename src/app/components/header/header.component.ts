import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { WebinarTypes } from 'src/app/models/webinar.model';
import { AutoUnsubscribe } from 'src/app/services/auto-unsubscribe';
import { EventBusService } from 'src/app/services/event.bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AutoUnsubscribe {
  searchQuery: string = '';
  private searchString$ = new Subject<string>();

  constructor(private eventBus: EventBusService) {
    super();
    this.searchString$
      ?.pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() => {
        this.eventBus.emit({
          type: WebinarTypes.filter,
          payload: this.searchQuery,
        });
      });
  }

  onSearch(): void {
    this.searchString$.next(this.searchQuery);
    console.log('Searching for:', this.searchQuery);
  }
}
