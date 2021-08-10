import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { tap, map, take } from 'rxjs/operators';
import {Roles} from '../shared/models/user.model';

@Injectable()
export class CanReadGuard implements CanActivate {

  constructor(private auth: AuthService,) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    this.auth.getCurrentUserData()
    console.log(this.auth.currentUserData)

    return this.auth.currentUserData.roles.pipe(
      take(1),
      map((roles:Roles) => roles && this.auth.canRead(roles) ? true : false),
      tap(canView => {
        if (!canView) {
          console.error('Access denied. Must have permission to view content')
        }
      })
    );

  }
}
