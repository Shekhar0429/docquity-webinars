import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class AutoUnsubscribe implements OnDestroy {
  private destroySubject$ = new Subject<void>();
  protected readonly destroy$ = this.destroySubject$.asObservable();
  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
