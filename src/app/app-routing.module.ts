import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth-guard';
import { MaintenanceComponent } from './errors/maintenance/maintenance.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { CandidatesComponent } from './modules/candidates/pages/candidates.component';
import { InterviewComponent } from './modules/interviews/pages/interview/interview.component';
import { SignUpComponent } from './modules/login/components/sign-up/sign-up.component';
import { LoginComponent } from './modules/login/pages/login/login.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { 
    path: 'candidatos', 
    //canActivate: [AuthGuard],
    component: CandidatesComponent,
  },
  {
    path: 'questionarios',
    //canActivate: [AuthGuard],
    component: InterviewComponent
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent,
    data: {
        title: 'Not found'
    } 
  },
  {
    path: 'calendario',
    //canActivate: [AuthGuard],
    component: MaintenanceComponent,
    data: {
      title: 'Maintenance'
    }
  },  
  { 
    path: '**', 
    redirectTo: 'not-found' 
  },
];

@NgModule({
  imports: [ 
      RouterModule.forRoot(routes ) 
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }