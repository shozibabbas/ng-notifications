import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {APIRoutes} from '../api-routes';
import {Md5} from 'ts-md5/dist/md5';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = null; // this keeps information of user

  constructor(private http: HttpClient, private cookieService: CookieService, public router: Router) {
    const cookie = this.cookieService.get('NotificationsTestUser');
    if (cookie !== '') {
      this.user = JSON.parse(this.cookieService.get('NotificationsTestUser'));
    }
  }

  IsAuthenticated(): boolean {
    return this.user !== null;
  }

  Get(): User {
    return this.user;
  }

  Login(username: string, password: string): Observable<User> {
    return this.http.post<User>(APIRoutes.USER_LOGIN, { Username: username, Password: Md5.hashStr(password)}, httpOptions).pipe(
      tap(userProfile => {
        if (userProfile !== null) {
          this.user = userProfile;
          console.log(this.user);
          this.cookieService.set('NotificationsTestUser', JSON.stringify(userProfile), 1);
        }
      })
    );
  }

  Register(fullName: string, username: string, password: string): Observable<any> {
    return this.http.post<User>(APIRoutes.USER_REGISTER, { FullName: fullName, Username: username, Password: Md5.hashStr(password) }, httpOptions);
  }

  Logout(): boolean {
    try {
      this.cookieService.delete('NotificationsTestUser');
      this.user = null;
      return true;
    } catch (e) {
      return false;
    }
  }
}
