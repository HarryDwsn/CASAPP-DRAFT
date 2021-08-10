import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { Project } from '../models/project.model';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

import {StudentService} from './student.service';
import {AuthService} from './auth.service';


@Injectable()
// tslint:disable-next-line:class-name
export class projectService {
  projectCol:AngularFirestoreCollection<Project>;
  projectDoc : AngularFirestoreDocument<Project>;
  userID:string;
  projects: any;
  project:Observable<Project>
  projectId:string;
  projectData:Project
  query:any

  constructor(private afs: AngularFirestore,
              private studentService:StudentService,
              private auth: AuthService)
  {
    this.userID = this.auth.currentUserData.id
  }


  getID(projectId: string){
    this.projectId = projectId
  }


  getProject(projectId) {
    this.projectDoc = this.afs.collection('allProjects').doc(projectId)
    this.projectId = projectId;
    this.project = this.projectDoc.valueChanges();
    this.project.subscribe( (project : Project) => {
      this.projectData = project
    })
    return this.projectData
  }

  getProjectsData(projectCol:AngularFirestoreCollection<Project>){
    this.projects = projectCol.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return {id,data}
        })
      }))
  }


  getProjects(cas:string, month,roles,userid,classroom){
    if (roles.admin === true && this.studentService.selectedUserId=== 'ALL'){
      if (month === 'All' && cas === 'All')
      {
        this.projectCol = this.afs.collection('allProjects')

        this.getProjectsData(this.projectCol)
        return this.projects
      }
      if (cas === 'All')
      {
        this.projectCol = this.afs.collection('allProjects',ref => ref
          .where('month', '==',month))

        this.getProjectsData(this.projectCol)
        return this.projects
      }
      if (month === 'All')
      {
        this.projectCol = this.afs.collection('allProjects',ref => ref
          .where('CAS', '==',cas))

        this.getProjectsData(this.projectCol)
        return this.projects
      }

      this.projectCol = this.afs.collection('allProjects',ref => ref
        .where('month', '==',month).where('CAS', '==',cas))

      this.getProjectsData(this.projectCol)
      return this.projects
    }

    if (roles.teacher === true && this.studentService.selectedUserId === 'ALL'){
      if (month === 'All' && cas === 'All')
      {
        this.projectCol = this.afs.collection('allProjects',ref => ref
          .where('classroom', '==',classroom))

        this.getProjectsData(this.projectCol)
        return this.projects

      }
      if (cas === 'All')
      {
        this.projectCol = this.afs.collection('allProjects',ref => ref
          .where('month', '==',month).where('classroom', '==',classroom))

        this.getProjectsData(this.projectCol)
        return this.projects
      }
      if (month === 'All')
      {
        this.projectCol = this.afs.collection('allProjects',ref => ref
          .where('CAS', '==',cas).where('classroom', '==',classroom))

        this.getProjectsData(this.projectCol)
        return this.projects
      }

      this.projectCol = this.afs.collection('allProjects',ref => ref
        .where('month', '==',month).where('CAS', '==',cas).where('classroom', '==',classroom))

      this.getProjectsData(this.projectCol)
      return this.projects
    }

    if (month === 'All' && cas === 'All')
    {
      this.projectCol = this.afs.collection('allProjects',ref => ref.where('userid', '==',this.userID) )
      this.getProjectsData(this.projectCol)

      return this.projects

    }

    if (cas === 'All')
    {
      this.projectCol = this.afs.collection('allProjects',ref => ref
        .where('userid', '==',this.userID).where('month', '==',month))

      this.getProjectsData(this.projectCol)
      return this.projects
    }

    if (month === 'All')
    {
      this.projectCol = this.afs.collection('allProjects',ref => ref
        .where('userid', '==',this.userID).where('CAS', '==',cas))

      this.getProjectsData(this.projectCol)
      return this.projects
    }

    this.projectCol = this.afs.collection('allProjects',ref => ref
      .where('userid', '==',this.userID).where('month', '==',month).where('CAS', '==',cas))

    this.getProjectsData(this.projectCol)
    return this.projects
  }


  addProject(project: Project) {
    this.afs.collection('allProjects').add({
      name: project.name,
      description:project.description,
      CAS: project.CAS,
      month: project.month,
      userid: project.userid,
      evidences: project.evidences,
      reflections: project.reflections,
      classroom: project.classroom
    })
  }

  updateProject(project: Project) {
    this.afs.collection('allProjects').doc(this.projectId).update({
      name: project.name,
      description:project.description,
      CAS: project.CAS,
      month: project.month,
      userid: project.userid,
      evidences: project.evidences,
      reflections: project.reflections,
      classroom: project.classroom
    })
  }

  deleteProject() {
    this.afs.collection('allProjects').doc(this.projectId).delete();
  }



}

