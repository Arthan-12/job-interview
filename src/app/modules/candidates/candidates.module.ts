import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './pages/candidates.component';
import { MenuModule } from 'src/app/shared/menu/menu.module';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';



@NgModule({
  declarations: [CandidatesComponent, AddDialogComponent],
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
  entryComponents: [],
  providers: [],
})
export class CandidatesModule { }
