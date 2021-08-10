import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import {throwError, BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Roles, User} from '../models/user.model';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { environment} from '../../../environments/environment';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface CurrentUserData {
  name: string;
  id: string;
  classroom: string;
  roles:any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<User>(null);

  currentUserData:CurrentUserData;

  tokenExpirationTimer: any;

  userOnlineData:Observable<any>

  currentRoles:any;

  currentUserSub: Subscription;




  constructor(private afs: AngularFirestore,
              private http: HttpClient,
              private router: Router) {
  }

  signup(email: string, password: string, name: string, classroom: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebase.apiKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.updateUserData(
            resData.email,
            resData.localId,
            name,
            classroom,
            resData.idToken);
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+ environment.firebase.apiKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      roles:Roles;
      name:string;
      classroom:string;

    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.roles,
      userData.name,
      userData.classroom,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,)
  {
    const docRef = this.afs.collection('users').doc(userId);
    this.userOnlineData = docRef.valueChanges()

    this.userOnlineData.subscribe((userData:User)=>{
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const roles = userData.roles
      const classroom = userData.classroom
      const name = userData.name

      const user = new User(email, userId,roles,name,classroom,token,expirationDate);

      this.user.next(user);

      this.autoLogout(expiresIn * 1000);

      localStorage.setItem('userData', JSON.stringify(user))

      this.router.navigate(['/projects'])
    })
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  private updateUserData(userEmail: string, userId: string, name: string, classroom: string,token: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userId}`);
    const data: User = {
      email: userEmail,
      id: userId,
      roles: {
        student: true,
        teacher: false,
        admin:false
      },
      name,
      classroom,
      token,
    }
    return userRef.set(data, {merge: true})
  }

  canRead(roles: Roles): boolean {
    const allowed = ['admin', 'teacher']
    return this.checkAuthorization(roles, allowed)
  }

  canNewProject(roles: Roles): boolean {
    const allowed = ['student']
    return this.checkAuthorization(roles, allowed)
  }

  canEdit(roles: Roles): boolean {
    const allowed = ['admin', 'teacher']
    return this.checkAuthorization(roles, allowed)
  }

  canDelete(roles: Roles): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(roles, allowed)
  }

  // determines if user has matching role
  private checkAuthorization(roles: Roles, allowedRoles: string[]): boolean {
    if (!roles) return false
    for (const role of allowedRoles) {
      if (roles[role])  {
        return true
      }
    }
    return false
  }

  getCurrentUserData(){
    this.currentUserSub = this.user.subscribe(user =>{
      this.currentUserData = user
    })
  }






}
