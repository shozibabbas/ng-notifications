import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Category} from '../../models/Category';
import {Location} from '@angular/common';
import {UserNotification} from '../../models/UserNotification';
import {NotificationService} from '../../services/notification.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {Alert} from '../../models/Alert';

@Component({
  selector: 'app-notification-generator',
  templateUrl: './notification-generator.component.html',
  styleUrls: ['./notification-generator.component.css']
})

/**
 * this component generates new notifications
 */
export class NotificationGeneratorComponent implements OnInit {

  /**
   * form group for notification
   */
  notificationForm: FormGroup;

  /**
   * selection of default category
   */
  defaultCategory: Category;

  /**
   * list of categories from Category enum
   */
  categoryList: any;

  /**
   * Constructor
   * @param formBuilder for creating notification form
   * @param location for handling navigation
   * @param notificationService for handling notifications
   * @param userService for attaching current user with requests
   * @param route for handling navigation
   * @param alertService for creating alerts
   */
  constructor(private formBuilder: FormBuilder, private location: Location,
              private notificationService: NotificationService, private userService: UserService,
              private route: ActivatedRoute, private alertService: AlertService) { }

  /**
   * Initialize alerts. initialize category list. initialize default category. initialize form.
   */
  ngOnInit() {
    this.alertService.reset();
    this.categoryList = Category;
    this.defaultCategory = Category.INFO;
    this.notificationForm = this.formBuilder.group({
      header: [ '', Validators.required ],
      body: [ '', Validators.required ],
      category: [ this.categoryList[this.defaultCategory], Validators.required ]
    });
  }

  /**
   * get categories for select box
   */
  getCategories(): Array<string> {
    const keys = Object.keys(this.categoryList);
    return keys.slice(keys.length / 2);
  }

  /**
   * return to previous navigated page
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * this method runs when form is submitted
   * @param shouldStay set to true to stay on the same page after notification creation
   */
  onSubmit(shouldStay: boolean = false) {
    if (this.notificationForm.invalid) {
      this.getFormValidationErrors();
      return;
    }

    const notification = new UserNotification(this.userService.Get()._id);
    notification.Header = this.notificationForm.controls.header.value;
    notification.Body = this.notificationForm.controls.body.value;
    notification.Category = this.notificationForm.controls.category.value;

    this.notificationService.add(notification).subscribe(result => {
      this.notificationForm.reset();
      this.notificationForm.controls.category.setValue(this.categoryList[this.defaultCategory]);

      const alert = new Alert();
      alert.type = 'success';
      alert.message = 'Notification Added';
      this.alertService.reset();
      this.alertService.unshift(alert);

      if (!shouldStay) {
        this.location.back();
      }
    });
  }

  /**
   * validate form errors
   */
  getFormValidationErrors() {
    Object.keys(this.notificationForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.notificationForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          const alert = new Alert();
          alert.type = 'warning';
          alert.message = `${key} is ${keyError}`;

          this.alertService.reset();
          this.alertService.unshift(alert);
        });
      }
    });
  }
}
