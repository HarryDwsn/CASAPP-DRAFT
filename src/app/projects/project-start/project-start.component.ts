import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-project-start',
  templateUrl: './project-start.component.html',
  styleUrls: ['./project-start.component.css']
})
export class ProjectStartComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit()
  {

  }

}
