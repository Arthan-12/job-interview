import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { map, mergeMap, tap, toArray } from 'rxjs/operators';

import { Candidate } from 'src/app/core/models/candidate.model';
import { CandidateService } from 'src/app/core/services/candidates.service';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { EditCandidateDialogComponent } from '../components/edit-candidate-dialog/edit-candidate-dialog.component';


@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  @Input() searchCandidate: string;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

  candidateUpdateForm: FormGroup;
  candidates: Candidate[] = [];
  candidate: Candidate;
  index: number;
  currentRow: number;

  candidate$: Observable<Candidate>;
  candidates$: Observable<Candidate[]>;

  searchBtnClicked: boolean = false;


  displayedColumns: string[] = ['id', 'name', 'interview', 'score', 'date', 'actions'];
  dataSource: MatTableDataSource<Candidate>;
 
  //subscription: Subscription;

  constructor(
      public fb: FormBuilder,
      public httpClient: HttpClient,
      private dialog: MatDialog,
      private candidateService: CandidateService,
      private snackBar: MatSnackBar,
      private changeDetectorRefs: ChangeDetectorRef
     
  ) { }
   
  ngOnInit() {
    this.candidates$ = this.candidateService.getAllCandidates();
    this.candidateService.getAllCandidates().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data)
    });
    this.candidateUpdateForm = this.fb.group({
      name: [''],
      interview: [''],
      score: [''],
      date: [''],    
    });
    this.refreshCandidateTable();
  }

  deleteCandidate(id: number) {
      this.dialog.open(ConfirmDialogComponent, {data: {
        actionTitle: 'Confirma exclusão de candidato?'
        }
      })
      .afterClosed().subscribe((result) => {
        if(result == true) {
        console.log(id);
        this.candidateService.deleteCandidate(id).subscribe()
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: 'Candidato deletado com sucesso!',
          duration: 2000,
          panelClass: ['snackbar-delete']
        });
        this.refreshCandidateTable();
        }
        
      }
    )  
  }

  updateCandidate(id: number, name: string, interview: string, score: number, date: string ): void {
    console.log(id)
    this.dialog.open(EditCandidateDialogComponent, {data: {
      formTitle: ['Editar dados do candidato'],
      id: id,
      name: name,
      interview: interview,
      score: score,
      date: date
      }
    })
    .afterClosed().subscribe(() => {
      this.refreshCandidateTable();
      this.currentRow = null;
    })
  }

  openDialog() {
    this.dialog.open(EditCandidateDialogComponent, { data: {
      formTitle: ['Inscreva um candidato'],
      name: [''],
      interview: [''],
      score: [''],
      date: ['']
      },
    })
    .afterClosed().subscribe(() => {
      this.refreshCandidateTable()
      }  
    );
  }

  refreshCandidateTable() {
    this.candidateService.getAllCandidates().subscribe((data: Candidate[]) => 
    this.dataSource.data = data);
    this.candidates$ = this.candidateService.getAllCandidates();
    this.changeDetectorRefs.detectChanges();
    console.log(this.dataSource)
  }

  showSearchCandidate() {
    if(!this.searchBtnClicked) this.searchBtnClicked = true;
    else if (this.searchBtnClicked) this.searchBtnClicked = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCandidate(i: number, name: string, interview: string, score: number, date: string) {
    //this.currentRow = i;
    //this.candidate.name = name;
    console.log(i, name, interview, score, date);
  }

  getAllCandidates() {
    console.log(this.dataSource.data);
    this.candidateService.getAllCandidates().subscribe(res =>
      console.log(res)
      )
  }

}