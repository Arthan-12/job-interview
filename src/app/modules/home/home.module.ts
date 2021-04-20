import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages/home.component";
import { DateCardComponent } from './components/date-card/date-card.component';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatRadioModule } from "@angular/material";
import { StartInterviewComponent } from "./components/start-interview/start-interview.component";
import { QuestionsCarouselComponent } from './components/questions-carousel/questions-carousel.component';

@NgModule({
    declarations: [ 
        HomeComponent, DateCardComponent, StartInterviewComponent, QuestionsCarouselComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        HomeRoutingModule,

        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,

        SharedModule,
    ],
})
export class HomeModule {}