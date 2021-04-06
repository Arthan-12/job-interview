import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages/home.component";
import { DateCardComponent } from './components/date-card/date-card.component';
import { MatCardModule, MatIconModule } from "@angular/material";

@NgModule({
    declarations: [ 
        HomeComponent, DateCardComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        HomeRoutingModule,

        MatCardModule,
        MatIconModule,

        SharedModule,
    ],
})
export class HomeModule {}