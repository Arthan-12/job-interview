import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './pages/candidates.component';
import { MenuModule } from 'src/app/shared/menu/menu.module';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditCandidateDialogComponent } from './components/edit-candidate-dialog/edit-candidate-dialog.component';
import { FormComponent } from './components/form/form.component';



@NgModule({
  declarations: [CandidatesComponent, EditCandidateDialogComponent, FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    MenuModule,

    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule
  ],
  entryComponents: [EditCandidateDialogComponent],
  providers: [],
})
export class CandidatesModule { }
