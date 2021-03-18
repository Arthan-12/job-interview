import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewComponent } from './pages/interview/interview.component';

const routes: Routes = [
    { 
        path: 'entrevistas',
        component: InterviewComponent,
    }
]

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) 
    ],
    exports: [ RouterModule ]
})
export class InterviewsRoutingModule { }