import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subject, Subscription} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  currentUser:any;
  userDoc : AngularFirestoreDocument<User>;
  studentDoc:any;
  selectedUserId = 'ALL';
  selectedStudentName:string;

  constructor(private afs:AngularFirestore,
              private authService:AuthService) {

  }

  getStudents(){
    this.currentUser = this.authService.currentUserData;
    // Gets all students
    this.studentDoc = this.afs.collection('users',ref => ref.where('roles.student','==',true))
    if (this.currentUser.roles.admin === false){
      // tslint:disable-next-line:max-line-length
      this.studentDoc = this.afs.collection('users',
          ref => ref
            .where('classroom','==',this.currentUser.classroom).where('roles.student','==',true))
    }
    return this.studentDoc.valueChanges()
  }

  allStudentSel(){
    this.selectedUserId = 'ALL'
    this.selectedStudentName = 'All'
  }

  studentSelected(student: any) {
    this.selectedStudentName = student.name
    this.selectedUserId = student.id
    console.log(this.selectedUserId)

  }
}
