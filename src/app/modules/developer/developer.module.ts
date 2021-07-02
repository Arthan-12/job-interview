import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatIconModule, MatSelectModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "src/app/shared/shared.module";
import { MultipleSelectComponent } from "./components/multiple-select/multiple-select.component";
import { DeveloperPageComponent } from "./pages/developer-page/developer-page.component";

@NgModule({
    declarations: [MultipleSelectComponent, DeveloperPageComponent],
    imports: [
       CommonModule,
       ReactiveFormsModule,
       FormsModule,
       RouterModule,
   
       SharedModule,
   
       NgSelectModule,
   
       MatIconModule,
       MatSelectModule
    ],
   })
   export class DeveloperModule {}