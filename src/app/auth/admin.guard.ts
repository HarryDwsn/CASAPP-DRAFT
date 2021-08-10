import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import {StudentService} from '../shared/services/student.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router : Router,
              private studentService: StudentService
              ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    if (this.auth.currentUserData.roles?.admin === true || this.auth.currentUserData.roles?.teacher === true) {
      // @ts-ignore
      return true
    }
    this.router.navigate([''])
    console.error('Access denied - Admins only')
  }
}
