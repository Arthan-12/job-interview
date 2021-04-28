import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceComponent } from './errors/maintenance/maintenance.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { CandidatesComponent } from './modules/candidates/pages/candidates.component';
import { InterviewComponent } from './modules/interviews/pages/interview/interview.component';
import { SignInComponent } from './modules/sign-in/pages/sign-in/sign-in.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  { 
    path: 'candidatos', 
    component: CandidatesComponent,
  },
  {
    path: 'questionarios',
    component: InterviewComponent
  },
  { 
    path: 'sign-in',
    component: SignInComponent,
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent,
    data: {
        title: 'Not found'
    } 
  },
  {
    path: 'calendário',
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
      RouterModule.forRoot(routes, { useHash: true } ) 
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }