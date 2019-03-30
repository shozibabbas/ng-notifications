import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { AlertComponent } from './components/alert/alert.component';
import { RegisterComponent } from './components/register/register.component';
import { NotificationGeneratorComponent } from './components/notification-generator/notification-generator.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationDetailComponent } from './components/notification-detail/notification-detail.component';

// bootstrap
import {NgbModule, NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import { PageTitleComponent } from './common/page-title/page-title.component';

@NgModule({
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
