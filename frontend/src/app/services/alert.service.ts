import { Injectable } from '@angular/core';
import { Alert } from '../models/Alert';

@Injectable({
  providedIn: 'root'
})
/**
 * this service controls alert boxes
 */
export class AlertService {

  /**
   * array for keeping alerts
   */
  private alerts: Alert[];

  /**
   * getter for alerts
   */
  public get alertsList(): Alert[] { return this.alerts; }

  /**
   * constructor.
   * Initialize alerts.
   */
  constructor() {
    this.reset();
  }

  /**
   * add alerts to array
   * @param alert to display
   */
  unshift(alert: Alert) {
    this.alerts.unshift(alert);
  }

  /**
   * close an open alert
   * @param alert to close
   */
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  /**
   * empty alerts array
   */
  reset() {
    this.alerts = [];
  }
}
