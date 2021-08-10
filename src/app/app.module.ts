/// MAIN ANGULAR Imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import {CommonModule} from '@angular/common';

import {AngularFireAuthModule} from '@angular/fire/auth';
/// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectItemComponent } from './projects/project-list/project-item/project-item.component';
import { ExtendedProjectComponent } from './extended-project/extended-project.component';
import { ExtendedEditComponent } from './extended-project/extended-edit/extended-edit.component';
import { ExtendedViewComponent } from './extended-project/extended-view/extended-view.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ProjectStartComponent } from './projects/project-start/project-start.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentsComponent } from './students/students.component';
import { AuthComponent } from './auth/auth.component';
import { DropzoneDirective } from './projects/project-edit/dropzone.directive';

/// Services
import {extendedService} from './extended-project/extended.service';
import { projectService } from './shared/services/project.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

/// PrimeNG
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import {FileUploadModule} from 'primeng/fileupload';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import { RadioButtonModule} from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';


/// Pipes and others
import { DropdownDirective } from './shared/dropdown.directive';
import { FilterProjectsPipe } from './projects/filter-projects.pipe';
import { ShortenPipe } from './shared/shorten.pipe';
import { environment } from '../environments/environment';
import {CanReadGuard} from './auth/can-read.guard';
import {StudentService} from './shared/services/student.service';
import {AuthService} from './shared/services/auth.service';
import {AdminGuard} from './auth/admin.guard';
import { AuthorPipe} from './shared/author.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectItemComponent,
    DropdownDirective,
    ProjectStartComponent,
    ProjectEditComponent,
    FilterProjectsPipe,
    ExtendedProjectComponent,
    ExtendedEditComponent,
    ExtendedViewComponent,
    ShortenPipe,
    AuthorPipe,
    AuthComponent,
    LoadingSpinnerComponent,
    StudentsComponent,
    StudentListComponent,
    DropzoneDirective,



  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SelectButtonModule,
    ButtonModule,
    CalendarModule,
    BrowserAnimationsModule,
    DropdownModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FileUploadModule,
    ToastModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    TabViewModule,
    RadioButtonModule,
    CheckboxModule,
  ],
  providers: [
    StudentService,
    AuthService,
    CanReadGuard,
    projectService,
    extendedService,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}
