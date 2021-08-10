import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.studentservice.getStudent()

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    localStorage.removeItem('selectedProjectId');
  }

}
