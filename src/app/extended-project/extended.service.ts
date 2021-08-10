import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


import {Extended } from '../shared/models/extended-project.model';

import {LearnOut} from '../shared/models/learning-outcome.model';


@Injectable()
// tslint:disable-next-line:class-name
export class extendedService {
  extendedChanged = new Subject<Extended[]>();

  private extended: Extended[] = [
    new Extended(
      'A Test project',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      'service',
      'August',
      'August',
      'run runru n sad time',
      [new LearnOut('seven','cus yes')],
    ),

  ];


  constructor() {}

  setExtended(extended: Extended[]) {
    this.extended = extended;
    this.extendedChanged.next(this.extended.slice());
  }

  getExtendeds() {
    return this.extended.slice();
  }

  getExtended(index: number) {
    return this.extended[index];
  }

  updateRecipe(index: number, newProject: Extended) {
    this.extended[index] = newProject;
    this.extendedChanged.next(this.extended.slice());
  }

  deleteRecipe(index: number) {
    this.extended.splice(index, 1);
    this.extendedChanged.next(this.extended.slice());
  }
}

