import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from "@angular/material";
import {DragDropModule} from '@angular/cdk/drag-drop';

import { MenuModule } from "src/app/shared/menu/menu.module";
import { InterviewComponent } from "./pages/interview/interview.component";
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop/drag-and-drop.component';



@NgModule({
 declarations: [InterviewComponent, DragAndDropComponent],
 imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    MenuModule,

    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    DragDropModule
 ],
})
export class InterviewsModule {}