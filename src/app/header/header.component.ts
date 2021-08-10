import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import {User} from '../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isAuthenticated = false;
  currentRoles:any;
  currentName:string

  private userSub: Subscription;

  constructor(
              private authService: AuthService,
              ) {}


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

    this.userSub = this.authService.user.subscribe((user:User) => {
      this.isAuthenticated = !!user;
      this.currentRoles = user?.roles
      this.currentName = user?.name
    });
  }



  onLogout() {
    this.authService.logout();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
