import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatIconModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTooltipModule, MatSnackBarModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
    declarations: [LoginComponent, SignInComponent, SignUpComponent],
    imports: [
       CommonModule,
       ReactiveFormsModule,
       FormsModule,
       RouterModule,
   
       SharedModule,
   
       MatIconModule,
       MatSelectModule,
       MatInputModule,
       MatFormFieldModule,
       MatButtonModule,
       MatTooltipModule,
    ],
   })
   export class LoginModule {}