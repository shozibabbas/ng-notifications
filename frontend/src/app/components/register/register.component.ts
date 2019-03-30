import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {Alert} from '../../models/Alert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/**
 * this component registers users
 */
export class RegisterComponent implements OnInit {

  /**
   * formgroup for registration
   */
  registerForm: FormGroup;

  /**
   * constructor for register component
   * @param formBuilder for creating register form
   * @param userService for registering user
   * @param router for handling navigation
   * @param alertService for generating alerts
   */
  constructor(private formBuilder: FormBuilder, private userService: UserService, public router: Router,
              private alertService: AlertService) { }

  /**
   * check authentication. initialize register form.
   */
  ngOnInit() {
    if (this.userService.IsAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required ],
      username: ['', Validators.required ],
      password: ['', [Validators.required, Validators.minLength(6)] ]
    });
  }

  /**
   * this method registers users
   */
  onRegister() {
    // validate form
    if (this.registerForm.invalid) {
      this.getFormValidationErrors();
      return;
    }

    // make http call to register user
    this.userService.Register(this.registerForm.controls.fullName.value,
      this.registerForm.controls.username.value,
      this.registerForm.controls.password.value).subscribe(result => {

        if (result.ok) {
          // move to login page if success
          const alert = new Alert();
          alert.type = 'success';
          alert.message = 'You have been registered. Please login to continue';
          this.alertService.reset();
          this.alertService.unshift(alert);

          this.router.navigate(['/login']);

        } else {
          // give failure alert and stay on same page
          const alert = new Alert();
          alert.type = 'danger';
          alert.message = `Username "${this.registerForm.controls.username.value}" already exists. Please try with another username.`;
          this.alertService.reset();
          this.alertService.unshift(alert);
        }
    });
  }

  /**
   * validate register form
   */
  getFormValidationErrors() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.registerForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          const alert = new Alert();
          alert.type = 'danger';
          alert.message = `${key} is ${keyError}`;

          this.alertService.reset();
          this.alertService.unshift(alert);
        });
      }
    });
  }
}
