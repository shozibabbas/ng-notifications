import { Component } from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';
import {AlertService} from './services/alert.service';
import {Alert} from './models/Alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * main component to start app
 */
export class AppComponent {

  /**
   * collapse control for navbar
   */
  isCollapsed: boolean;

  /**
   * constructor for app component
   * @param userService for handling user logout
   * @param router for handling navigation
   * @param alertService for creating alerts
   */
  constructor(public userService: UserService, public router: Router, private alertService: AlertService) {
    this.isCollapsed = false;
  }

  /**
   * this method is for logging out current user
   */
  logout() {
    if (this.userService.Logout()) {
      const alert = new Alert();
      alert.type = 'success';
      alert.message = `You have been logged out successfully!`;

      this.alertService.reset();
      this.alertService.unshift(alert);
      this.router.navigate(['login']);
    }
  }
}
