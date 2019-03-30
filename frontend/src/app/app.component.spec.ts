import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AlertComponent} from './components/alert/alert.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import {NotificationGeneratorComponent} from './components/notification-generator/notification-generator.component';
import {NotificationComponent} from './components/notification/notification.component';
import {NotificationDetailComponent} from './components/notification-detail/notification-detail.component';
import {PageTitleComponent} from './common/page-title/page-title.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
