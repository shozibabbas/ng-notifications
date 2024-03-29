import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APIRoutes} from '../api-routes';
import {UserNotification} from '../models/UserNotification';
import {catchError, tap} from 'rxjs/operators';
import {UserService} from './user.service';
import {AlertService} from './alert.service';
import {Alert} from '../models/Alert';
import {Category} from '../models/Category';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notifications: UserNotification[] = [];

  public get notificationsList(): UserNotification[] { return this.notifications; }

  constructor(private http: HttpClient, private userService: UserService, private alertService: AlertService,
              private router: Router) {
  }

  get(notificationId?): Observable<UserNotification[]> {
    let userNotificationRoute;
    if (notificationId === undefined) {
      userNotificationRoute = APIRoutes.NOTIFICATIONS + '/' + this.userService.Get()._id;
    } else {
      userNotificationRoute = APIRoutes.NOTIFICATIONS + '/' + this.userService.Get()._id + '/' + notificationId;
    }

    return this.http.get<UserNotification[]>(userNotificationRoute, environment.httpOptions).pipe(
      tap(notifications => {
        if (notificationId === undefined) {
          this.notifications = notifications;
        }
      }),
      catchError(this.handleError<any>('get notifications'))
    );
  }

  add(notification): Observable<UserNotification> {
    return this.http.post<UserNotification>(APIRoutes.NOTIFICATIONS, notification, environment.httpOptions).pipe(
      (tap(result => {
        if (result !== null) {
          this.notifications.unshift(result);
          if (result.Category.toString() === "INFO") {
            setTimeout(() => {
              this.notifications.filter((value) => {
                return value === result;
              })[0].IsClosed = true;
            }, environment.INFO_TIMEOUT);
          }
        } else {
          this.logError('Error in adding notification');
        }
      }))
    );
  }

  update(notification): Observable<any> {
    return this.http.put(APIRoutes.NOTIFICATIONS, notification, environment.httpOptions).pipe(
      (tap(status => {
        if (status) {
          this.notifications.filter((value) => {
            return value._id === notification._id;
          })[0] = notification;
        } else {
          this.logError('Error in updating notification');
        }
      })),
      catchError(this.handleError<any>('update notification'))
    );
  }

  delete(notification): Observable<any> {
    return this.http.delete(`${APIRoutes.NOTIFICATIONS}/${notification._id}`, environment.httpOptions).pipe(
      (tap(status => {
        if (status) {
          this.notifications.splice(this.notifications.indexOf(notification), 1);
        } else {
          this.logError('Error in deleting notification');
        }
      })),
      catchError(this.handleError<any>('delete notification'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logError(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      this.router.navigate(['dashboard']);
      return of(result as T);
    };
  }

  private logError(message: string) {
    const alert: Alert = new Alert();
    alert.message = `Error: ${message}`;
    alert.type = 'danger';
    this.alertService.unshift(alert);
  }
}

