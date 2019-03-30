import {TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {AppComponent} from '../app.component';
import {LoginComponent} from '../components/login/login.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {AlertComponent} from '../components/alert/alert.component';
import {RegisterComponent} from '../components/register/register.component';
import {NotificationGeneratorComponent} from '../components/notification-generator/notification-generator.component';
import {NotificationComponent} from '../components/notification/notification.component';
import {NotificationDetailComponent} from '../components/notification-detail/notification-detail.component';
import {PageTitleComponent} from '../common/page-title/page-title.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';
import {UserNotification} from '../models/UserNotification';
import {Category} from '../models/Category';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      LoginComponent,
      DashboardComponent,
      AlertComponent,
      RegisterComponent,
      NotificationGeneratorComponent,
      NotificationComponent,
      NotificationDetailComponent,
      PageTitleComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      NgbModule,
      NgbAccordionModule
    ],
    providers: [
      CookieService
    ]
  }));

  function SampleData(): UserNotification {
    const notification = new UserNotification('0');
    notification.Header = 'sampleHeader';
    notification.Body = 'sampleBody';
    notification.Category = Category.INFO;
    notification.IsClosed = false;
    return notification;
  }

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });

  it('should add', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    const sample = SampleData();
    service.add(SampleData()).subscribe(result => {
      expect(result.Header === sample.Header && this.Body === sample.Body && this.Category === sample.Category &&
        this.UserId === sample.UserId).toBeTruthy();
    });
  });
});
