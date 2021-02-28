import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MenuModule } from "src/app/shared/menu/menu.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages/home.component";
import { DateCardComponent } from './components/date-card/date-card.component';
import { MatCardModule } from "@angular/material";
import { CoreModule } from "src/app/core/core.module";

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

        MenuModule,
    ],
})
export class HomeModule {}