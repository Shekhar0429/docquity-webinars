import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Speaker, Webinar, WebinarTypes } from '../../models/webinar.model';
import { WebinarService } from '../../services/webinar.service';
import { EventBusService } from 'src/app/services/event.bus.service';
import { AutoUnsubscribe } from 'src/app/services/auto-unsubscribe';

/**
 * Component for displaying and filtering webinars
 */
@Component({
  selector: 'app-webinar-listing',
  templateUrl: './webinar-listing.component.html',
  styleUrls: ['./webinar-listing.component.scss'],
})
export class WebinarListingComponent extends AutoUnsubscribe implements OnInit {
  // Data properties
  webinars: Webinar[] = [];
  private allWebinars: Webinar[] = [];
  topSpeakers: Speaker[] = [];

  // UI State
  activeTab = 'All';
  isLoading = false;

  // Constants
  readonly tabs = ['All', 'Live', 'Upcoming'] as const;
  readonly categories = [
    'Management-Led',
    'Telehealth-US',
    'Pharma-Australia-US',
    'Wellness-India-US',
    'Emergency Medicine-US',
    'Finance-Malaysia-US',
    'Emergency-Glob',
    'Remote Medicine-US',
  ] as const;

  constructor(
    private readonly webinarService: WebinarService,
    private readonly eventBus: EventBusService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadWebinars();
    this.subscribeToSearchEvents();
  }

  private loadWebinars(): void {
    this.isLoading = true;

    forkJoin({
      webinars: this.webinarService.getWebinars(),
      topSpeakers: this.webinarService.getTopSpeakers(),
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: ({ webinars, topSpeakers }) => {
          this.allWebinars = webinars;
          this.webinars = [...webinars];
          this.topSpeakers = topSpeakers;
        },
        error: (error) => {
          console.error('Error loading webinars:', error);
        },
      });
  }

  private subscribeToSearchEvents(): void {
    this.eventBus
      .on(WebinarTypes.filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchString: string) => {
        this.filterBySearchString(searchString);
      });
  }

  getFilteredWebinars(type: string): Webinar[] {
    return this.webinars.filter((webinar) => webinar.type === type);
  }

  private filterBySearchString(searchString: string): void {
    if (!searchString?.trim()) {
      this.webinars = [...this.allWebinars];
      return;
    }

    const searchLower = searchString.toLowerCase().trim();

    this.webinars = this.allWebinars.filter(
      (webinar) =>
        this.matchesSearch(webinar.title, searchLower) ||
        this.matchesSearch(webinar.speaker.name, searchLower)
    );
  }

  private matchesSearch(text: string, searchTerm: string): boolean {
    return text.toLowerCase().includes(searchTerm);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
