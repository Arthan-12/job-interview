import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SignInComponent } from "./pages/sign-in/sign-in.component";

@NgModule({
    declarations: [SignInComponent],
    imports: [
       CommonModule,
       ReactiveFormsModule,
       FormsModule,
       RouterModule,
   
       SharedModule,
   
    ],
   })
   export class SignInModule {}