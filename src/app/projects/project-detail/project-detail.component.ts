import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from '../../shared/models/project.model';
import { projectService } from '../../shared/services/project.service';
import {Observable, Subscription} from 'rxjs';
import {StudentService} from '../../shared/services/student.service';
import {AuthService} from '../../shared/services/auth.service';
import {Roles} from '../../shared/models/user.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'project-recipe-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project:Observable<Project>
  id: number;
  userSub:Subscription
  currentRoles:Roles;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private projectService: projectService,
              private authService:AuthService,
              private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user =>{
      this.currentRoles = user?.roles
    })
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          const projectId: { projectId: string; } = JSON.parse(localStorage.getItem('selectedProjectId'));
          this.projectService.getProject(projectId)
          this.project = this.projectService.project;
        }
      );

  }




  onEditProject() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
    this.projectService.deleteProject();
    this.router.navigate(['/projects']);
  }



}
