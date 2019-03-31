import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

/**
 * this component creates alerts under the navbar
 */
export class AlertComponent implements OnInit {

  /**
   * constructor for alert
   * @param alertService uses alert service to control behavior
   */
  constructor(private alertService: AlertService) {}

  ngOnInit() {}

}
