import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';

import { EditCandidateDialogComponent } from './components/edit-candidate-dialog/edit-candidate-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SearchCandidateComponent } from './components/search-candidate/search-candidate.component';
import { SearchCandidatePipe } from './components/search-candidate/search-candidate.pipe';
import { CandidatesComponent } from './pages/candidates.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CandidatesComponent, EditCandidateDialogComponent, ConfirmDialogComponent, SearchCandidateComponent, SearchCandidatePipe],
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
    MatSelectModule,
    MatTooltipModule
  ],
  entryComponents: [EditCandidateDialogComponent, ConfirmDialogComponent],
  providers: [],
})
export class CandidatesModule { }
