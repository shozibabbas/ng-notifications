import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate(): boolean {
    if (!this.userService.IsAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
