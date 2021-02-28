import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './pages/candidates.component';

const routes: Routes = [
    { 
        path: 'candidatos',
        component: CandidatesComponent,
    }
]

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) 
    ],
    exports: [ RouterModule ]
})
export class CandidatesRoutingModule { }