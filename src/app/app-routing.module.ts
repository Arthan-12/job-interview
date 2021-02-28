import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { CandidatesComponent } from './modules/candidates/pages/candidates.component';


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
    path: 'not-found', 
    component: NotFoundComponent,
    data: {
        title: 'Not found'
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