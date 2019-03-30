import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import {Alert} from '../models/Alert';

describe('AlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  function SampleData(): Alert {
    const alert: Alert = new Alert();
    alert.message = 'sample';
    alert.type = 'info';
    return alert;
  }

  it('should be created', () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });

  it('should have the same pushed alert in array', () => {
    const service: AlertService = TestBed.get(AlertService);

    const alert: Alert = SampleData();
    service.unshift(alert);
    expect(service.alertsList[0]).toBe(alert);
  });

  it('should have 1 count after 1 unshift', () => {
    const service: AlertService = TestBed.get(AlertService);

    const alert: Alert = SampleData();
    service.unshift(alert);
    expect(service.alertsList.length).toBe(1);
  });

  it('should have 100 count after 100 unshift', () => {
    const service: AlertService = TestBed.get(AlertService);

    for (let i = 0; i < 100; i++) {
      const alert: Alert = SampleData();
      service.unshift(alert);
    }

    expect(service.alertsList.length).toBe(100);
  });

  it('should have 0 alerts in array after 1/1 close', () => {
    const service: AlertService = TestBed.get(AlertService);

    const alert: Alert = SampleData();
    service.unshift(alert);
    service.close(alert);
    expect(service.alertsList.length).toBe(0);
  });

  it('should have 5 alerts in array after 95/100 close', () => {
    const service: AlertService = TestBed.get(AlertService);

    for (let i = 0; i < 100; i++) {
      const alert: Alert = SampleData();
      service.unshift(alert);
      if (i > 4) {
        service.close(alert);
      }
    }

    expect(service.alertsList.length).toBe(5);
  });

  it('should have 0 alerts in array after reset', () => {
    const service: AlertService = TestBed.get(AlertService);

    for (let i = 0; i < 100; i++) {
      const alert: Alert = SampleData();
      service.unshift(alert);
    }

    service.reset();

    expect(service.alertsList.length).toBe(0);
  });
});
