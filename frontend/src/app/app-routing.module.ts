import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuardService} from './services/auth-guard.service';
import {RegisterComponent} from './components/register/register.component';
import {NotificationGeneratorComponent} from './components/notification-generator/notification-generator.component';
import {NotificationDetailComponent} from './components/notification-detail/notification-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'notification/new', component: NotificationGeneratorComponent, canActivate: [AuthGuardService] },
  { path: 'notification/:id', component: NotificationDetailComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
