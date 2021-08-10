import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { projectService } from '../../shared/services/project.service';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';
import {StudentService} from '../../shared/services/student.service';
import {AuthService} from '../../shared/services/auth.service';

interface Month {
  name: string,
  code: string
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})



export class ProjectListComponent implements OnInit, OnDestroy {
  projects: any;
  console = console;
  months: Month[];
  CAS: SelectItem[];
  CASSelected = 'All';
  monthSelected = 'All';

  currentUser:any;

  groupedDate: SelectItemGroup[];

  items: SelectItem[];

  item: string;


  // tslint:disable-next-line:no-shadowed-variable
  constructor(private projectService: projectService,
              private router: Router,
              private route: ActivatedRoute,
              private studentService: StudentService,
              private authService: AuthService,
              )
      {
        this.CAS = [
          { label: 'ALL', value: 'All' },
          { label: 'CREATIVITY', value: 'creativity' },
          { label: 'ACTIVITY', value: 'activity' },
          { label: 'SERVICE', value: 'service' },
        ];

        this.items = [];
        for (let i = 0; i < 10000; i++) {
          this.items.push({label: 'Item ' + i, value: 'Item ' + i});
        }

        this.groupedDate = [
          {
            label: 'ALL', value: 'All',
            items: [
              {label: 'All', value: 'All'},
            ]
          },
          {
            label: '2020', value: '2020',
            items: [
              {label: 'January', value: 'January'},
              {label: 'February', value: 'February'},
              {label: 'March', value: 'March'},
              {label: 'April', value: 'April'},
              {label: 'May', value: 'May'},
              {label: 'June', value: 'June'},
              {label: 'July', value: 'July'},
              {label: 'August', value: 'August'},
              {label: 'September', value: 'September'},
              {label: 'October', value: 'October'},
              {label: 'November', value: 'November'},
              {label: 'December', value: 'December'},
            ]

          },
          {
            label: '2021', value: '2021',
            items: [
              {label: 'January', value: 'January'},
              {label: 'February', value: 'February'},
              {label: 'March', value: 'March'},
              {label: 'April', value: 'April'},
              {label: 'May', value: 'May'},
              {label: 'June', value: 'June'},
              {label: 'July', value: 'July'},
              {label: 'August', value: 'August'},
              {label: 'September', value: 'September'},
              {label: 'October', value: 'October'},
              {label: 'November', value: 'November'},
              {label: 'December', value: 'December'},
            ]
          }
        ];
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserData

    this.projects = this.projectService.getProjects(
      this.CASSelected,
      this.monthSelected,
      this.currentUser.roles,
      this.currentUser.id,
      this.currentUser.classroom)

  }

  onNewProject() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onFilter() {
    this.projects = this.projectService.getProjects(
      this.CASSelected,
      this.monthSelected,
      this.currentUser.roles,
      this.currentUser.id,
      this.currentUser.classroom)
  }

  onngon(){
    this.CASSelected = 'All'
    this.monthSelected = 'All'
    this.ngOnInit()

  }



  ngOnDestroy() {
  }
}
