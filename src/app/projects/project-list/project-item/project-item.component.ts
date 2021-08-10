import {Component, OnInit, Input, OnDestroy} from '@angular/core';

import { Project } from '../../../shared/models/project.model';
import {projectService} from '../../../shared/services/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {User} from '../../../shared/models/user.model';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../../shared/services/auth.service';
import {StudentService} from '../../../shared/services/student.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit, OnDestroy{
  @Input() project: Project;
  @Input() projectId: Project;
  @Input() index: number;

  id:number
  console = console;





  constructor(public auth:AuthService)
  {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectProject(projectId){
    localStorage.setItem('selectedProjectId', JSON.stringify(projectId))
  }
}
