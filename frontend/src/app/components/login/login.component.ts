import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Alert} from '../../models/Alert';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * This component is for login
 */
export class LoginComponent implements OnInit {

  /**
   * controls the login form
   */
  loginForm: FormGroup;

  /**
   * constructor for login
   * @param formBuilder to create and handle login form
   * @param router for handling routes after login
   * @param userService for authenticating user
   * @param alertService for generating messages related to login
   */
  constructor(private formBuilder: FormBuilder, public router: Router, private userService: UserService,
              private alertService: AlertService) { }

  /**
   * check previous authentication.
   * Initialize formgroup.
   */
  ngOnInit() {
    if (this.userService.IsAuthenticated()) {
      this.router.navigate(['dashboard']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', [Validators.required, Validators.minLength(6)] ]
    });
  }

  /**
   * this function runs when login form is submitted
   */
  onLogin() {
    // validate login form
    if (this.loginForm.invalid) {
      this.getFormValidationErrors();
      return;
    }

    // send request for login
    this.userService.Login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(result => {
      if (result !== null) {
        // create alert for success and move to the dashboard
        const alert = new Alert();
        alert.type = 'success';
        alert.message = `Welcome ${result.FullName}!`;

        this.alertService.reset();
        this.alertService.unshift(alert);
        this.router.navigate(['dashboard']);
      } else {
        // error in authentication; generate alert and stay on same page.
        const alert = new Alert();
        alert.type = 'danger';
        alert.message = 'Incorrect login details. Please correct and try again.';

        this.alertService.reset();
        this.alertService.unshift(alert);
      }
    });
  }

  getFormValidationErrors() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.loginForm.get(key).errors;
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
