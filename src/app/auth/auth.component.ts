import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../shared/services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  class: string;
  classrooms: any;

  constructor(private authService: AuthService, private router: Router, private afs: AngularFirestore) {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(){
    const teacherDoc = this.afs.collection('teachers')
    this.classrooms = teacherDoc.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,data}
        })
      }))
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const classroom = form.value.class;
    const name = form.value.name

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email,password,name,classroom);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        console.log('HERE')
        this.router.navigate(['/projects'])
        ;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
