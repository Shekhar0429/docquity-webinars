import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarListingComponent } from './webinar-listing.component';

describe('WebinarListingComponent', () => {
  let component: WebinarListingComponent;
  let fixture: ComponentFixture<WebinarListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
