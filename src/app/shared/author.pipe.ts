import { Pipe, PipeTransform } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './models/user.model';

@Pipe({
  name: 'author'
})

export class AuthorPipe implements PipeTransform {
  user:any;
  userData:User;
  name:any;
  constructor(private afs: AngularFirestore)
  {}

  transform(value: any) {
    const userDoc = this.afs.collection('users').doc(value)
    this.user = userDoc.valueChanges();
    this.user.subscribe( (user) => {
      this.userData = user
      this.name = this.userData.name
      console.log(this.name)
    })
    return this.name
  }

}
