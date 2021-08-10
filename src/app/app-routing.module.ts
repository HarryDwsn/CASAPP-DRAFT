import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard} from './auth/auth.guard';
import { ProjectStartComponent } from './projects/project-start/project-start.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
// import { ProjectsResolverService } from './projects/projects-resolver.service';
import {ExtendedProjectComponent} from './extended-project/extended-project.component';
import {ExtendedEditComponent} from './extended-project/extended-edit/extended-edit.component';
import{AuthComponent} from './auth/auth.component';
import {StudentsComponent} from './students/students.component';
import {CanReadGuard} from './auth/can-read.guard';
import {AdminGuard} from './auth/admin.guard';



const appRoutes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  {
    path: 'projects',
    component: ProjectsComponent,
    // resolve: [RoleResolverService],
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProjectStartComponent },

      { path: 'new', component: ProjectEditComponent },

      {
        path: ':id',
        component: ProjectDetailComponent,
      },

      {
        path: ':id/edit',
        component: ProjectEditComponent,
      }
    ]

  },

  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuard,AdminGuard],

  },

  {
    path: 'extended',
    component: ExtendedProjectComponent,
    children: [
      { path: '', component: ExtendedProjectComponent },

      { path: 'new', component: ExtendedProjectComponent },

      {
        path: ':id',
        component: ProjectDetailComponent,
        // resolve: [ProjectsResolverService]
      },

      {
        path: ':id/edit',
        component: ExtendedEditComponent,
        // resolve: [ProjectsResolverService]
      }
    ]

  },

  { path: 'auth', component: AuthComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
