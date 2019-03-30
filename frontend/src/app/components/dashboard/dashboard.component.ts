import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {UserNotification} from '../../models/UserNotification';
import {Helper} from '../../common/helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

/**
 * This component creates the dashboard
 */
export class DashboardComponent implements OnInit {

  /**
   * helper class
   */
  helper: Helper;

  /**
   * constructor for dashboard
   * @param notificationService this to show notifications on dashboard
   */
  constructor(public notificationService: NotificationService) { }

  /**
   * initiates helper and notifications
   */
  ngOnInit() {
    this.helper = new Helper();
    this.notificationService.get();
  }

  /**
   * delete notification
   * @param notification
   */
  delete(notification: UserNotification) {
    const conf = confirm('Are you sure you want to delete this notification?');
    if (!conf) {
      return;
    }
    this.notificationService.delete(notification).subscribe(result => {
      console.log(result);
    });
  }
}
