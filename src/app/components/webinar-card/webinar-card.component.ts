import { Component, Input, OnInit } from '@angular/core';
import { Webinar } from 'src/app/models/webinar.model';

@Component({
  selector: 'app-webinar-card',
  templateUrl: './webinar-card.component.html',
  styleUrls: ['./webinar-card.component.scss'],
})
export class WebinarCardComponent {
  @Input() webinar!: Webinar;
}
