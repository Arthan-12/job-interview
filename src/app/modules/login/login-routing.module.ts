import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
    { 
        path: 'login',
        component: LoginComponent,
    },       
]

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) 
    ],
    exports: [ RouterModule ]
})
export class LoginRoutingModule { }