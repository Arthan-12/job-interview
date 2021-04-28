import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/core/auth/login-guard';
import { HomeComponent } from './pages/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        //canActivate: [LoginGuard],
    }
]

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) 
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }