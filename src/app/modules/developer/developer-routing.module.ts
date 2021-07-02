import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeveloperPageComponent } from "./pages/developer-page/developer-page.component";

const routes: Routes = [
    { 
        path: 'desenvolvedor',
        component: DeveloperPageComponent,
    }
]

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) 
    ],
    exports: [ RouterModule ]
})
export class InterviewsRoutingModule { }