import {Component, HostListener} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  loadedFeature = 'recipe';


  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }



  constructor(private primengConfig: PrimeNGConfig,
              private authservice: AuthService,
              private router: Router) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.authservice.autoLogin()
    this.authservice.getCurrentUserData()

  }
}
