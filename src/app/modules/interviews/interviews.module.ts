import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTooltipModule } from "@angular/material";
import {DragDropModule} from '@angular/cdk/drag-drop';

import { SharedModule } from "src/app/shared/shared.module";
import { InterviewComponent } from "./pages/interview/interview.component";
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop/drag-and-drop.component';
import { EditQuestionDialogComponent } from './components/edit-question-dialog/edit-question-dialog.component';
import { ConfirmDialogComponent } from "../candidates/components/confirm-dialog/confirm-dialog.component";
import { SnackbarComponent } from "src/app/shared/components/snackbar/snackbar.component";
import { MultipleSelectComponent } from '../developer/components/multiple-select/multiple-select.component';
import { NgSelectModule } from "@ng-select/ng-select";



@NgModule({
 declarations: [InterviewComponent, DragAndDropComponent, EditQuestionDialogComponent],
 imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    SharedModule,

    NgSelectModule,

    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    DragDropModule,
    MatDialogModule,
    MatTooltipModule
 ],
 entryComponents: [EditQuestionDialogComponent, ConfirmDialogComponent, SnackbarComponent],
})
export class InterviewsModule {}