import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { projectService } from '../../shared/services/project.service';
import {SelectItem} from 'primeng/api';
import {Project} from '../../shared/models/project.model';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {StudentService} from '../../shared/services/student.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';



@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})

export class ProjectEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  project: Project;
  projectForm: FormGroup;
  selectedMon: string;
  checked = false;
  CAS: SelectItem[];
  LO: string[] = [];
  maxYear = '2022';
  minYear = '2020';
  selectedCAS: string;
  currentUserId:string;



  constructor(
    private route: ActivatedRoute,
    // tslint:disable-next-line:no-shadowed-variable
    private projectService: projectService,
    private studentService: StudentService,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private http:HttpClient,
    private db: AngularFirestore,
    private formBuilder: FormBuilder) {

}

  ngOnInit() {
    this.currentUserId = this.authService.currentUserData.id
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  ngOnDestroy() {
  }

  onSubmit() {
    if (this.editMode) {
      this.projectService.updateProject(this.projectForm.value);
    }
    else {
      console.log(this.projectForm.value)
      this.projectService.addProject(this.projectForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  createItem(data): FormGroup {
    return this.formBuilder.group(data);
  }

  // Help to get all photos controls as form array.
  get evidences(): FormArray {
    return this.projectForm.get('evidences') as FormArray;
  };

  pushFileToStorage(file){
    const name = Date.now() + '_' + file.name
    const path = `${this.authService.currentUserData.id}/${name}`;
    const storageRef = this.storage.ref(path);
    const uploadTask = this.storage.upload(path, file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.evidences.push(this.createItem({
            downloadURL,
            path,
            name
          }));
        });
      })
    ).subscribe();
  }

  detectFiles(event) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        // tslint:disable-next-line:prefer-const
        this.pushFileToStorage(file)

      }
    }
  }

  deleteFileStorage(path: string): void {
    const storageRef = this.storage.ref(path);
    storageRef.delete();
  }

  removeEvidence(i){
    this.deleteFileStorage(this.evidences.at(i).value.path)
    this.evidences.removeAt(i);
  }


  private initForm() {
    this.CAS = [
      { label: 'CREATIVITY', value: 'creativity' },
      { label: 'ACTIVITY', value: 'activity' },
      { label: 'SERVICE', value: 'service' }
    ];



    let projectName = '';
    let projectDescription = '';
    let projectReflection = '';
    let projectCAS = '';
    let projectMonth = '';
    let projectUserid = this.currentUserId;
    let projectClassroom = this.authService.currentUserData.classroom;
    const projectEvidences = this.formBuilder.array([]);


    if (this.editMode) {
      const projectId: { projectId: string; } = JSON.parse(localStorage.getItem('selectedProjectId'));
      this.project = this.projectService.getProject(projectId)
      projectName = this.project.name;
      projectDescription = this.project.description;
      projectMonth = this.project.month;
      projectReflection = this.project.reflections;
      projectCAS = this.project.CAS;
      projectUserid = this.project.userid;
      projectClassroom = this.project.classroom;
      this.selectedCAS = this.project?.CAS;
      this.selectedMon = this.project?.month;


      if (this.project.evidences) {
        for (const evidence of this.project.evidences) {
          projectEvidences.push(
            new FormGroup(
              {downloadURL: new FormControl(evidence.downloadURL),
                      path: new FormControl(evidence.path),
                      name: new FormControl(evidence.name)}
            )
          )
        }
      }
    }

    this.projectForm = this.formBuilder.group({
      name: new FormControl(projectName, Validators.required),
      month: new FormControl(projectMonth, Validators.required),
      description: new FormControl(projectDescription, Validators.required),
      reflections: new FormControl(projectReflection,Validators.required),
      CAS: new FormControl(projectCAS,Validators.required),
      userid: new FormControl(projectUserid),
      classroom: new FormControl(projectClassroom),
      evidences: projectEvidences,
    });

  }
}
