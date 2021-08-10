import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Student} from '../../shared/models/student.model';
import {StudentService} from '../../shared/services/student.service';
import {projectService} from '../../shared/services/project.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Observable<Student[]>;

  console = console



  constructor(private afs: AngularFirestore,
              private studentService:StudentService,
              // tslint:disable-next-line:no-shadowed-variable
              private projectService:projectService) {
    this.students = this.studentService.getStudents()
  }

  ngOnInit(): void {

  }

  onStudentSel(student:Student) {
    this.studentService.studentSelected(student)
    this.projectService.userID = student.id
    console.log(student.id)

  }

}
