import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Helper} from '../../common/helper';
import {UserNotification} from '../../models/UserNotification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

/**
 * this handles all quick notifications
 */
export class NotificationComponent implements OnInit {

  /**
   * Helper class
   */
  helper: Helper;

  /**
   * constructor for notifications
   * @param notificationService for handling notifications
   */
  constructor(public notificationService: NotificationService) { }

  /**
   * initialize helper and get notifications
   */
  ngOnInit() {
    this.helper = new Helper();
    this.notificationService.get().subscribe(result => {});
  }

  /**
   * this method runs when a notification is closed on UI
   * @param notification
   */
  close(notification: UserNotification) {
    notification.IsClosed = true;
    this.notificationService.update(notification).subscribe(result => {
      this.notificationService.get().subscribe(_ => {});
    });
  }

  /**
   * this method fetches all notifications that are not closed on UI.
   * It fulfills the requirement of fetching only 4 or 5 notifications when there are more in array
   */
  getNotifications() {
    return this.notificationService.notifications.filter(element => {
      return !element.IsClosed;
    }).slice(0, this.showMoreNotification() ? 4 : 5);
  }

  /**
   * this method checks to see if the count of notifications is more than 5.
   * It then creates a 'more notifications' UI alert
   */
  showMoreNotification() {
    return this.notificationService.notifications.filter(element => {
      return !element.IsClosed;
    }).length > 5;
  }
}
