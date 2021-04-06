import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './pages/candidates.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditCandidateDialogComponent } from './components/edit-candidate-dialog/edit-candidate-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [CandidatesComponent, EditCandidateDialogComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    SharedModule,

    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule
  ],
  entryComponents: [EditCandidateDialogComponent, ConfirmDialogComponent],
  providers: [],
})
export class CandidatesModule { }
