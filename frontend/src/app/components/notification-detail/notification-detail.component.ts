import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {NotificationService} from '../../services/notification.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../models/Category';
import {UserNotification} from '../../models/UserNotification';
import {AlertService} from '../../services/alert.service';
import {Alert} from '../../models/Alert';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})

/**
 * this component creates page for editing notification
 */
export class NotificationDetailComponent implements OnInit {

  /**
   * This takes in a notification to edit
   */
  @Input() notification: UserNotification;

  /**
   * list of categories for select
   */
  categoryList: any;

  /**
   * constructor for notification details
   * @param location for controlling navigation
   * @param notificationService for handling notification updates
   * @param route for getting parameters from URL
   * @param alertService for creating alerts
   * @param router for navigating
   */
  constructor(public location: Location,
              private notificationService: NotificationService,
              private route: ActivatedRoute, private alertService: AlertService,
              private router: Router) { }

  /**
   * reset alerts. initialize categories. fetch notification for editing
   */
  ngOnInit() {
    this.alertService.reset();
    this.categoryList = Category;
    this.getNotification();
  }

  /**
   * method for getting notification
   */
  getNotification(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.notificationService.get(paramId)
      .subscribe(result => {
        if (result.length === 0) {
          const alert = new Alert();
          alert.type = 'danger';
          alert.message = 'There is no notification for the ID provided';
          this.alertService.unshift(alert);
          this.router.navigate(['dashboard']);
        } else {
          this.notification  = result[0];
        }
      });
  }

  /**
   * This fetches categories from enum Category
   */
  getCategories(): Array<string> {
    const keys = Object.keys(this.categoryList);
    return keys.slice(keys.length / 2);
  }

  /**
   * This method runs on saving current notification
   */
  onSubmit() {
    // validation of fields
    if (this.notification.Header === '' || this.notification.Body === '' || this.notification.Category === null) {
      const alert = new Alert();
      alert.type = 'warning';
      alert.message = 'Fields cannot be left empty';
      this.alertService.unshift(alert);
      return;
    }

    // update notification
    this.notificationService.update(this.notification).subscribe(result => {

      // create success alert
      const alert = new Alert();
      alert.type = 'success';
      alert.message = 'Notification Changed';
      this.alertService.unshift(alert);

      // return to dashboard
      this.location.back();
    });
  }

}
